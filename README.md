# Innowise Lab Internship: custom-components-lib

A reusable, customizable React component library built with TypeScript and SCSS Modules. Includes accessible UI components like buttons, inputs, modals, and more.

[Link to task](https://drive.google.com/file/d/1C148FRnWfXVoRDslDWcYac3bEhebdIAV/view)

---

## Components

- Button
- TextField
- Checkbox
- Modal
- Select
- Switch

## 📦 Installation

To install the library in your React project:

```bash
npm install @michalwachowicz/custom-components-lib
```

## 🚀 Usage Example

```tsx
import { Button, TextField } from "@michalwachowicz/custom-components-lib";

export default function App() {
  return (
    <div>
      <TextField label='Username' variant='outlined' />
      <Button size='large' onClick={() => alert("Clicked!")}>
        Submit
      </Button>
    </div>
  );
}
```

## 📕 Storybook

Every component in the project has a story in the storybook, so you can check each component seperately. To test the storybooks, you need to run the project locally:

```bash
git clone git@github.com:michalwachowicz/custom-components-lib.git
cd custom-components-lib
npm install
npm run storybook
```

## 🤝 Contributing

Contributions, suggestions, and issues are welcome! Feel free to open a PR or issue on [Issues Page](https://github.com/michalwachowicz/custom-components-lib/issues).
