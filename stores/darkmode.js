export default defineStore("darkmode", {
  state: () => ({
    darkMode: false,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
});
