import AWS from "aws-sdk";
import UglifyJS from "uglify-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { path, appId, shadowHost, data } = body;

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "path should should be string and not empty",
    });
  }

  const {
    prefixPath,
    ahaformBaseCdn,
    ahaformTemplateCdn,
    bucket,
    ...config
  } = useRuntimeConfig();

  const templateOutput = getJSTemplate(data, {
    ahaformBaseCdn,
    ahaformTemplateCdn,
    appId,
    shadowHost,
  });

  if (templateOutput.error) {
    throw createError({
      statusCode: 400,
      statusMessage: "code minify error " + templateOutput.error,
    });
  }

  const s3client = getS3Client(config);

  const s3params = buildParams(
    bucket,
    `${prefixPath}/${path}`,
    templateOutput.code
  );

  const uploadResult = await upload(s3client, s3params);

  return {
    result: uploadResult,
  };
});

function upload(s3client: AWS.S3, params: any) {
  return new Promise((resolve, reject) => {
    s3client.upload(params, (err: Error, result: any) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}

function buildParams(bucket: string, key: string, value: Buffer | string) {
  return {
    Bucket: bucket,
    Key: key,
    Body: value,
    ContentEncoding: "string",
    ACL: "public-read",
    CacheControl: "max-age=300",
    ContentType: "application/javascript",
  };
}

function getS3Client(config: {
  region: string;
  accessKeyId: string;
  secret_access_key: string;
}) {
  // 上传 aws
  AWS.config.region = config.region;
  AWS.config.update({
    apiVersion: "2006-03-01",
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secret_access_key,
    region: config.region,
  });
  return new AWS.S3();
}

/**
 * @fix TODO://需要babel做一下代码降级，否则兼容性太差
 * @param data
 * @param options
 * @returns
 */
function getJSTemplate(data: unknown, options: any) {
  const { appId = "ahaRoot", shadowHost } = options;
  const queryCodes = [`document.querySelector('#${appId}')`];
  shadowHost &&
    queryCodes.push(
      `document.querySelector('${shadowHost}').shadowRoot.querySelector('#${appId}')`
    );
  return UglifyJS.minify(`
    ;(async function(){
        try {
            // read from config ,ahaform base library,ahaform template
            await Promise.all(['${options.ahaformBaseCdn}','${
    options.ahaformTemplateCdn
  }'].map(i=>loadJs(i)));
            const template = new AhaFormTemplate.survey({
                data: ${JSON.stringify(data)}
            })
            const app = ${queryCodes.join("||")};
            new AhaForm(app, {
                template,
                submitResolve: function (res) {
                    console.log('submit data --->', res);
                    with(res){
                        //injected code
                        console.log(res);
                    }
                }
            }).init();

        } catch(ex){
            console.log(ex);
        }

        function loadJs(src){

            return new Promise((resolve,reject)=>{
                const script = document.createElement('script');
                script.src = src;
                script.onload = ()=> resolve();
                document.head.appendChild(script);
            })
        }
    })();
    `);
}
