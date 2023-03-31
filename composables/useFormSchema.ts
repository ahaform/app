export const useFormSchema = (data: any) => {
  const schema = [
    {
      $cmp: "number",
      props: {
        label: "baseFontSize",
        name: "baseFontSize",
        validation: "",
        includeUnit: true,
      },
    },
    {
      $cmp: "number",
      props: {
        label: "tagFontSize",
        name: "tagFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "color",
      props: {
        label: "tagColor",
        name: "tagColor",
      },
    },
    {
      $cmp: "number",
      props: {
        label: "textFontSize",
        name: "textFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "color",
      props: {
        label: "textColor",
        name: "textColor",
      },
    },
    {
      $cmp: "number",
      props: {
        label: "subFontSize",
        name: "subFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "color",
      props: {
        label: "subColor",
        name: "subColor",
      },
    },
    {
      $cmp: "number",
      props: {
        label: "answerFontSize",
        name: "answerFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "number",
      props: {
        label: "completeTitleFontSize",
        name: "completeTitleFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "color",
      props: {
        label: "completeTitleColor",
        name: "completeTitleColor",
      },
    },
    {
      $cmp: "number",
      props: {
        label: "completeSubtitleFontSize",
        name: "completeSubtitleFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "color",
      props: {
        label: "completeSubtitleColor",
        name: "completeSubtitleColor",
      },
    },
    {
      $cmp: "number",
      props: {
        label: "completeDescriptionFontSize",
        name: "completeDescriptionFontSize",
        includeUnit: true,
      },
    },
    {
      $cmp: "color",
      props: {
        label: "completeDescriptionColor",
        name: "completeDescriptionColor",
      },
    },
  ];
  const currentUnit = ref("px");
  const fontUnitOptions = [
    {
      key: "px",
      value: "px",
    },
    {
      key: "em",
      value: "em",
    },
  ];

  const keysWithUnit = computed(() => {
    return schema.filter((s) => s.props.includeUnit).map((s) => s.props.name);
  });

  const ratio = 16;
  watch(currentUnit, (currUnit, prevUnit) => {
    if (currUnit !== prevUnit) {
      //更新key单元
      keysWithUnit.value.forEach((key) => {
        const currValue = data[key].value;
        data[key].unit = currUnit;
        data[key].value =
          currUnit === "px" ? Math.floor(currValue * ratio) : currValue / ratio;
      });
    }
  });

  return {
    schema,
    fontUnitOptions,
    currentUnit,
  };
};
