import { httpClient } from "@/shared/httpClient";
import { ExtendedFile } from "../types/extendedFile";
import { useFileManagerStore } from "./useFileManagerStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFileUploadMutation = () => {
    const uploadProgress = useFileManagerStore((state) => state.updateUploadProgress);
    const updateUploadStatus = useFileManagerStore((state) => state.updateUploadStatus);
    const appendFiles = useFileManagerStore((state) => state.appendFiles);
    const queryClient = useQueryClient();

    return useMutation({
        onMutate: (variables) => {
            appendFiles(variables.map((item) => item.file));
        },
        mutationFn: async (files: ExtendedFile[]) => {
            const uploadPromises = files.map(async (file) => {
                if (file.uploadStatus === 'idle') {
                    updateUploadStatus(file.id, 'pending');
                    const formData = new FormData();
                    formData.append('file', file.file);
                    return httpClient.post('/upload', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (event) => {
                            if (event.lengthComputable && event.total) {
                                const percentCompleted = Math.round((event.loaded / event.total) * 100);
                                uploadProgress(file.id, percentCompleted);
                            }
                        }
                    }).then(() => {
                        updateUploadStatus(file.id, 'success');
                    }).catch(() => {
                        updateUploadStatus(file.id, 'error');
                    })
                }
                Promise.resolve();
            });
            await Promise.all(uploadPromises);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['files']
            });
        }
    }
    )
}

