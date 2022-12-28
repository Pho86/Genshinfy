export default defineStore("darkmode", {
  state: () => ({
    darkMode: true,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
});
