import moment from "moment";
// 自定义指令  时间格式
export default function registerFormatTime(app: any) {
  app.directive("format-time", {
    mounted(
      el: {
        textContent: string;
      },
      bindings: any,
      VNode: any,
      preNode: any
    ) {
      const context = el.textContent;
      let timestamp = parseInt(context);
      if (context.length === 10) {
        timestamp = timestamp * 1000;
      }
      const forMat = bindings.value || "YYYY-MM-DD HH:mm:ss";
      el.textContent = moment(timestamp).format(forMat);
    },
  });
}
