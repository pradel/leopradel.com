---
title: Detect GraphQL breaking changes on any CI with graphql-inspector
date: '05/09/2021'
description: 'Safely merge a pull request by automatically detecting if a breaking change is present'
---

> [GraphQL Inspector](https://graphql-inspector.com) is a set of tools to help you better maintain and improve GraphQL API as well as GraphQL consumers.

GraphQL Inspector provides an amazing GitHub action with a lot of cool features. But if you are using another CI you will have to code them yourself.

When integrating GraphQL Inspector to detect breaking changes on pull requests using Buildkite, I wanted to allow a GraphQL breaking change to be merged if it was intentional. An easy way to do this is to add a label to the pull request named "GraphQL breaking change".

Hopefully, the following script can help you to achieve this easily using the GitHub API. It should also be fairly simple to make it work with Gitlab.

## Step 1 - Make the CI fail if a breaking change is present

To simply detect a breaking change just add the following script as part of your CI.

```sh
# checkGraphqlBreakingChanges.sh

#!/usr/bin/env bash
set -e

yarn graphql-inspector diff 'git:origin/main:./schema.json' 'schema.json'
```

If a breaking change is present this script will fail.

## Step 2 - Allow a breaking change to be merged if a GitHub label is present on the PR

Create a new pull request label via the GitHub UI named "GraphQL breaking change".

The script works directly with Buildkite but you will have to replace the `BUILDKITE_PULL_REQUEST` env variable with the one provided by your CI.

Your CI env needs to have access to a `GITHUB_USER` and `GITHUB_USER_TOKEN` allowing the script to query the GitHub API.

```sh
# checkGraphqlBreakingChanges.sh

#!/usr/bin/env bash
set -e

# Label allowed
ALLOW_LABEL="GraphQL breaking change"

# We only want to run this logic if we are on a pull request
if [ -z "$BUILDKITE_PULL_REQUEST" ]; then
    echo "Skipping, not a pull request..."
    exit 0
fi

# Get the labels array from the Github API for the pull request
GITHUB_PR_LABELS=$(curl -u $GITHUB_USER:$GITHUB_USER_TOKEN \
  -s "https://github.com/api/v3/repos/my-org/my-repo/pulls/$BUILDKITE_PULL_REQUEST" \
  | jq '.labels[].name')

# If label is set on the pr we stop the execution as breaking change is intentional
if [[ ${GITHUB_PR_LABELS[*]} =~ "$ALLOW_LABEL" ]]; then
    echo "Skipping, because label is set..."
    exit 0
fi

yarn graphql-inspector diff 'git:origin/main:./schema.json' 'schema.json'
```
