import ErrorSnackbar from "../components/ErrorSnackbar";

export default {
  title: "SnackbarError",
  component: ErrorSnackbar,
  parameters: {
    componentSubtitle: "A notification that pops up after a failed API data fetch.",
    docs: {
      description: {
        component: "This is a notification that pops up after a failed data fetch from the API. In such a situation, you need to attach your own API, as I didn't want to expose mine publicly on GitHub.",
      },
    },
  },
};

export const Basic = () => <ErrorSnackbar />;
