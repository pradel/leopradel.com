---
title: react-responsive-modal v5
date: '04/06/2020'
description: '🎉 Releasing version 5 of react-responsive-modal'
---

The last release of react-responsive-modal ([v4.0.1](https://github.com/pradel/react-responsive-modal/releases/tag/v4.0.1)) was almost a year ago, so I finally decided to take some time and update [the repository](https://github.com/pradel/react-responsive-modal). I always found that the entry cost of importing the lib was too big, so I really focused this release on this part.

Please open an issue on [github](https://github.com/pradel/react-responsive-modal/issues) if you have any problems with the new version.

Check out [how to migrate](#how-to-migrate).

## Improvements

- Decreased bundle size from 8.1kb to 3kb minified and gzipped 📦🎉.
- Rewrote the package with typescript.
- Rewrote the package with React hooks.
- Added new examples to the documentation.
- Upgraded docz for the documentation.

## Breaking changes

- Minimum react version is now `16.8.0`.
- Now need to import the css file.
- Removed `onEntered` prop.
- `onExited` has been renamed to `onAnimationEnd`.
- Removed `closeIconSize`.
- Removed `closeIconSvgPath` use the new `closeIcon` prop instead.
- Removed `focusTrapOptions` as react-focus-trap is not used anymore internally.
- New CSS animations.

## How to migrate?

### 1. Import css file

We do not bundle the css with the component anymore, you now have to import the css file yourself.

```ts
import 'react-responsive-modal/styles.css';
```

### 2. Custom animations

In order to get rid of `react-transition-group` and save some sizes on the final bundle, I had to change the way you write animations for your modal.
We now use the CSS animations `@keyframes` rules.

As an example, if your current animation looks like this:

```css
.transitionEnter {
  opacity: 0.01;
}
.transitionEnterActive {
  opacity: 1;
  transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);
}
.transitionExit {
  opacity: 1;
}
.transitionExitActive {
  opacity: 0.01;
  transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

You will need to change it to something like this:

```css
@keyframes custom-fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes custom-fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

Then when rendering your modal, pass the `animationIn` and `animationOut` properties:

```jsx
() => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      classNames={{
        animationIn: 'custom-fadeIn',
        animationOut: 'custom-fadeOut',
      }}
      animationDuration={1000}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
        risus, sed porttitor quam.
      </p>
    </Modal>
  );
};
```

### 3. Custom icon

In order to use a custom icon you will need to use the new `closeIcon` prop. The `closeIconSvgPath` and `closeIconSize` have been removed.

You can use the new `closeIcon` prop this way:

```jsx
{
  () => {
    const [open, setOpen] = React.useState(false);
    const closeIcon = (
      <svg fill="currentColor" viewBox="0 0 20 20" width={28} height={28}>
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        ></path>
      </svg>
    );

    return (
      <>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal open={open} onClose={() => setOpen(false)} closeIcon={closeIcon}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </>
    );
  };
}
```
