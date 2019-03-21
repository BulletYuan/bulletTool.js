interface ImageOptionData {
  imgSrc?: string,                   // 图片资源地址
  width?: number,                    // 图片宽度
  height?: number,                   // 图片高度
  quality?: number,                  // 图片质量 (0-1)
  fileType?: string,                 // 图片输出文件类型
  done: (base64: string) => void,    // 图片压缩完成后回调方法
}