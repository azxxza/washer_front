import CommonIcon from '_c/common-icon'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return this.$config.useI18n ? this.$t(item.title) : ((item.meta && item.meta.title) || item.title)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    showOneChildren (item) {
      return item.children && (item.children.length === 1 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : ((children0 && item.children) ? item.children[0].name : item.name)
    }
  }
}
