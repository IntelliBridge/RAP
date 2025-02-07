This was the initial TextInput component that was used with formik.

It was replaced with the TextInput component in the shared/components/TextInput/ folder, but some forms still use it.

The new one used useFormikContext so that properties don't need to be passed down to the component.

-Rob