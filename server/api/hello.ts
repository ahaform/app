export default defineEventHandler((event) => {
  const { region, bucket } = useRuntimeConfig();

  return {
    msg: `Hello from server  ${region} , ${bucket}`,
  };
});
