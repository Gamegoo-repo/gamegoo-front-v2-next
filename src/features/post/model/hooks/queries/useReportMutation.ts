import { useMutation } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";

type ReportMutationProps = {
  memberId: number;
  reportCodeList: number[];
  pathCode: number;
  contents: string;
  boardId: number;
};

export const useReportMutation = () => {
  return useMutation({
    mutationFn: async ({
      memberId,
      reportCodeList,
      pathCode,
      contents,
      boardId
    }: ReportMutationProps) => {
      const { error } = await clientSideOpenapiClient.POST("/api/v2/report/{memberId}", {
        params: {
          path: {
            memberId
          }
        },
        body: {
          reportCodeList,
          pathCode,
          contents,
          boardId
        }
      });

      if (error) throw error;
    },

    onSuccess: () => {
      toastMessage.success("신고가 완료되었습니다.");
    },

    onError: () => {
      toastMessage.error("해당 회원에 대한 신고가 이미 등록되었습니다.");
    }
  });
};
