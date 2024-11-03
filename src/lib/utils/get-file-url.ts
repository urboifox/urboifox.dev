export const getFileUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileUrl = reader.result as string;
            resolve(fileUrl);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
