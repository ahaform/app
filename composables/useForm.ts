export function useForm() {
  const formData = ref(null);
  const app = ref<{ unmount: () => void }>();

  function save() {}
  async function publish(path: string, data: any) {
    const body = {
      path: path,
      data: {
        ...data,
      },
    };

    save();

    const result = await $fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(body),
    });

    ElMessage({
      type: "success",
      message: JSON.stringify(result),
    });
  }

  async function find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          baseFontSize: { unit: "px", value: "14" },
          tagFontSize: { unit: "px", value: "16" },
          tagColor: "#555555",
          textFontSize: { unit: "px", value: "24" },
          textColor: "#181818",
          subFontSize: { unit: "px", value: "12" },
          subColor: "#999999",
          answerFontSize: { unit: "px", value: "16" },
          completeTitleFontSize: { unit: "px", value: "26" },
          completeTitleColor: "#181818",
          completeSubtitleFontSize: { unit: "px", value: "16" },
          completeSubtitleColor: "#181818",
          completeDescriptionFontSize: { unit: "px", value: "18" },
          completeDescriptionColor: "#3B3B3B",
          formData:'[{"type":"choice","originalType":"choice","required":true,"title":"这里是一个问题的标题","multiple":false,"maxSelectNum":9999,"isShowText":true,"id":"TUgP2Xwwzm","options":[{"value":"这里是选项1","label":"这里是选项1"},{"value":"这里是选项2","label":"这里是选项2"},{"value":"这里是选项3","label":"这里是选项3"}],"allowOther":false,"otherPrompt":""},{"type":"picture-choice","originalType":"picture-choice","required":true,"title":"这里是一个图片选择问题的标题","multiple":false,"maxSelectNum":9999,"isShowText":true,"id":"k2TW3_MKkP","options":[{"imageSrc":"","label":"这里是选项1"}],"allowOther":false},{"type":"text","required":true,"placeholder":"请输入","title":"这里是一个短文本问题的标题","id":"mDpupZMb7S"},{"type":"long-text","required":true,"placeholder":"请输入","title":"这里是一个长文本问题的标题","id":"dvYroS5P_6"},{"type":"phone","required":true,"placeholder":"请输入您的手机号码","title":"这里是一个手机号码问题的标题","id":"UAXMNmCQoq","defaultCountry":"jp"},{"type":"score","required":true,"title":"这里是一个打分问题的标题","range":[1,5],"id":"U_XEKimhCR","scoreMinTag":"","scoreMaxTag":""},{"id":"__complete","showSubmit":false,"endPageData":[{"type":"title","text":"这里是结束页的标题"},{"type":"description","text":"这里是结束页的描述文字"},{"type":"button","text":"OK","action":{"type":"close","url":"","isOpenInNewBrowser":false}}]}]'
        });
      });
    });
  }

  async function renderForm(data: any, domRef: Ref<any>) {
    const mockAssetId = Math.random().toString().replace(/\./g, "_");

    if (app.value) {
      app.value.unmount();
    }

    //@ts-ignore
    app.value = await window.__PT_COMPONENTS_RENDER__(
      domRef.value,
      mockAssetId,
      () => {
        return {
          id: "03fa9de5-679b-4273-b282-0626dd798370",
          name: "pt-flow-form",
          bundleUrl:
            "https://ecstatic.ptengine.com/sdk/ahaform/bundle.js",
          config: {
            data: {
              ...data,
            },
            events: {},
          },
        };
      },
      false,
      true
    );
  }

  return {
    find,
    publish,
    renderForm,
  };
}
