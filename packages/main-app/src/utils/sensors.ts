import sensors from 'sa-sdk-javascript'

sensors.init({
  show_log: false,
  server_url: '', // 上报地址
  is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  use_client_time: true,
  send_type: 'beacon',
  heatmap: {
    // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap: 'default',
    // 是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map: 'default',
    // 通过 collect_tags 配置是否开启其他任意元素的全埋点采集（默认不采集），其中 div 通过配置最多可以采集 3 层嵌套情况。
    collect_tags: {
      div: {
        max_level: 3, // 默认是 1，即只支持叶子 div。可配置范围是 [1, 2, 3],非该范围配置值，会被当作 1 处理。
      },
      input: true,
      textarea: true,
      button: true,
      select: true,
      optgroup: true,
      option: true,
      img: true,
      svg: true,
      audio: true,
      video: true,
      a: true,
      li: true,
      tr: true,
      td: true,
    },
    // 开启全埋点时，配置带有指定属性的页面元素点击，自动采集点击事件。
    track_attr: [],
    // 开启可视化支持自定义属性和任意层级 div 标签功能
    get_vtrack_config: true,
  },
  // 集成了神策 Web JS SDK 的 H5 页面，在嵌入到 App 后，H5 内的事件可以通过 App 进行发送，事件发送前会添加上 App 采集到的预置属性。该功能默认是关闭状态，如果需要开启，需要在 App 和 H5 端同时进行配置。
  app_js_bridge: false,
})

sensors.registerPage({
  product_name: '微前端主应用',
  project_name: 'main-app',
})

// Web页面浏览($pageview)
sensors.quick('autoTrack')

// 公开给子应用使用
window.sensors = sensors

/**
 * 设置登录用户信息
 *
 * @export
 * @param {*} user 用户信息
 */
export async function loginEvent(user: any) {
  sensors.login(`${user.id}`)
  sensors.setProfile({
    user_id: user.id,
    user_name: user.name,
  })
}

/**
 * 神策自定义埋点
 *
 * @export
 * @param {string} [name=''] 事件名
 * @param {*} [props={}] 属性
 */
export function reportEvent(name = '', props: any = {}) {
  sensors.track(name, props)
}
