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
          formData:
            '[{"id":"test","tagline":"111","title":"11","required":true,"type":"text","keepAlive":false,"multiple":false,"allowOther":false,"helpTextShow":false},{"id":"2","tagline":"2","title":"2","required":true,"type":"text","keepAlive":false,"multiple":false,"allowOther":false,"helpTextShow":false},{"id":"__complete","title":"2额 ","subtitle":"","description":"","showSubmit":false},{"id":"test","tagline":"test","title":"","required":true,"type":"choice","keepAlive":false,"multiple":false,"allowOther":false,"helpTextShow":false,"options":[{"label":"1","value":"1"},{"label":"2","value":"2","imageSrc":""},{"label":"3","value":"3","imageSrc":""}]}]',
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
            "https://ecstatic.ptengine.com/ecp/1b35d857-3f52-4d6e-911c-70e4a6062481/app/03fa9de5-679b-4273-b282-0626dd798370/0.1.0/bundle.js",
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
