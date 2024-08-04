import QRCode from "qrcode";

export async function generateQRCode(text: string) {
  try {
    const url = await QRCode.toDataURL(text);
    return url;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
