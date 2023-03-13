import AWS from "aws-sdk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { path, data } = body;

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "path should should be string and not empty",
    });
  }

  const template = getJSTemplate(data);

  const { bucket, prefixPath, ...config } = useRuntimeConfig();

  const s3client = getS3Client(config);

  const s3params = buildParams(bucket, `${prefixPath}/${path}`, template);

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

function getJSTemplate(data: any) {
  return `
    // should minify 
    ;(async function(){
        try {
            // read from config ,ahaform base library,ahaform template
            await Promise.all(['','']);
            const template = new AhaFormTemplate.survey({
                data: ${JSON.stringify(data)}
            })
            new AhaForm('#ahaRoot', {
                template,
                submitResolve: function (res) {
                    //可以动态注入脚本来处理,通过配置来处理
                    console.log('submit data --->', res)
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

   
    `;
}
