import QRCode from "qrcode";

/**
 * Generates a QR code for the given URL.
 * @param url - URL for which the QR code is to be generated.
 * @returns A promise that resolves to the QR code image data in base64 format.
 */
export const generateQrCode = async (url: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 400,
    });
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error("Error generating QR code");
  }
};
