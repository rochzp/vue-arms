import BrowserLogger from 'alife-logger'

const classifyRE = /(?:^|[-_])(\w)/g
const classify = str =>
  str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '')

/**
 * 格式化组件名称
 * @param {Object} vm 组件实例
 * @param {Boolean} includeFile 是否包括文件
 */
const formatComponentName = (vm, includeFile) => {
  if (vm.$root === vm) {
    return '<Root>'
  }
  const options =
    typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm
  let name = options.name || options._componentTag
  const file = options.__file
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/)
    name = match && match[1]
  }

  return (
    (name ? `<${classify(name)}>` : '<Anonymous>') +
    (file && includeFile !== false ? ` at ${file}` : '')
  )
}

const repeat = (str, n) => {
  let res = ''
  while (n) {
    if (n % 2 === 1) res += str
    if (n > 1) str += str
    n >>= 1
  }
  return res
}

/**
 * 生产组件追踪
 * @param {Object} vm 组件实例
 */
const generateComponentTrace = vm => {
  if (vm._isVue && vm.$parent) {
    const tree = []
    let currentRecursiveSequence = 0
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1]
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++
          vm = vm.$parent
          continue
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence]
          currentRecursiveSequence = 0
        }
      }
      tree.push(vm)
      vm = vm.$parent
    }
    return `\n\nfound in\n\n${tree
      .map(
        (vm, i) =>
          `${i === 0 ? '---> ' : repeat(' ', 5 + i * 2)}${
            Array.isArray(vm)
              ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
              : formatComponentName(vm)
          }`
      )
      .join('\n')}`
  }
  return `\n\n(found in ${formatComponentName(vm)})`
}

class VueArams {
  constructor ({ pipe, ...config }, useEnvs = ['production']) {
    this.config = config || {}
    this.pipe = pipe
    this.useEnvs = useEnvs
    if (Array.isArray(useEnvs) && useEnvs.includes(process.env.NODE_ENV)) {
      const copyConfig = Object.assign({}, config)
      try {
        if (copyConfig.pid) {
          this.logger = BrowserLogger.singleton(copyConfig, pipe)
          this.logger.install = this.install
          return this.logger
        }
        throw new Error('cannot find pid')
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }

  install (Vue, options = {}) {
    const { useEnvs = this.useEnvs } = options
    if (
      !useEnvs ||
      (useEnvs && useEnvs.includes(process.env.NODE_ENV))
    ) {
      const prevErrorHander = Vue.config.errorHandler
      const errorHandler = (err, vm, info) => {
        this.error(err, {
          filename: `${vm.$vnode.tag}, ${info}`
        })
        if (
          typeof console !== 'undefined' &&
          typeof console.error === 'function' &&
          process.env.NODE_ENV !== 'production'
        ) {
          const trace = vm ? generateComponentTrace(vm) : ''
          const msg = `Error in ${info}: "${err.toString()}"`
          console.error(`[Vue warn]: ${msg}${trace}`)
        }
        if (typeof prevErrorHander === 'function') {
          prevErrorHander.call(this, err, vm, info)
        }
      }
      Vue.config.errorHandler = errorHandler
      window.addEventListener('error', e => {
        this.error(e.error, e)
      })
      window.addEventListener('unhandledrejection', e => {
        this.error(e.error, e)
      })
      Vue.prototype.$logger = this
    }
  }
}

export default VueArams
