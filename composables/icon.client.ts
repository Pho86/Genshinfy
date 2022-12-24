import { Directive } from "vue"

type vIconReturn = {
  vIcon: Directive
}

export const useVIcon = (): vIconReturn => ({
  vIcon: {
    mounted(el, binding) {
      let iconClass = `fa fa-${binding.value} text-2xl`;
      if (binding.arg === 'full') {
        iconClass = binding.value;
      }
      if (binding.modifiers.right) {
        iconClass += ' float-right';
      }
      if (binding.modifiers.yellow) {
        iconClass += ' text-yellow-500';
      } else {
        iconClass += ' text-green-400'
      }
      el.innerHTML += `<i class="${iconClass}"> </i>`;
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  },
})

export const useVSecondaryIcon = (): vIconReturn => ({
  vIcon: {
    mounted(el, binding) {
      let iconClass = `fa fa-${binding.value} text-2xl`;

      if (binding.arg === 'full') {
        iconClass = binding.value;
      }
      
      if (binding.value.right) {
        iconClass += ' float-right';
      }

      el.innerHTML += `<i class="${iconClass}"> </i>`;
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  },
})