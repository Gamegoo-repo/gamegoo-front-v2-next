"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";

import { UserInfo } from "@/entities/auth";
import { POST_QUERYKEYS } from "@/entities/post";
import { POST_DETAIL_QUERY_KEYS } from "@/entities/post/constants/postDetail.queryKeys";

import {
  BoardData,
  Comment,
  MainAndSubPosition,
  MicSwitch,
  ModalContainer,
  type PostForm,
  PreferredGameMode,
  SelectGameStyle,
  WantPosition
} from "@/features/board";

type PostProps = {
  boardId?: string;
  postData: BoardData;
  userInfo: UserInfo;
};

export function Post({ boardId, postData, userInfo }: PostProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const methods = useForm<PostForm>({
    mode: "onChange",
    defaultValues: {
      mainPosition: postData?.mainP ?? undefined,
      subPosition: postData?.subP ?? undefined,
      wantMainPosition: postData?.wantP[0] ?? undefined,
      wantSubPosition: postData?.wantP[1] ?? undefined,
      gameMode: postData?.gameMode ?? "FAST",
      gameStyles: postData?.gameStyles ?? [],
      mic: postData?.mike ?? "UNAVAILABLE",
      comment: postData?.contents ?? ""
    }
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset
  } = methods;

  // postData가 있으면 form 업데이트
  useEffect(() => {
    if (postData) {
      reset({
        mainPosition: postData.mainP,
        subPosition: postData.subP,
        wantMainPosition: postData.wantP[0],
        wantSubPosition: postData.wantP[1],
        gameMode: postData.gameMode,
        gameStyles: postData.gameStyles,
        mic: postData.mike,
        comment: postData.contents
      });
    }
  }, [postData, reset]);

  const handleOnSubmit = async (data: PostForm) => {
    const body = {
      mainP: data.mainPosition!,
      subP: data.subPosition!,
      wantP: [data.wantMainPosition!, data.wantSubPosition!],
      gameMode: data.gameMode,
      gameStyles: data.gameStyles,
      mike: data.mic,
      contents: data.comment
    };

    // -> 글을 수정할 때
    if (postData) {
      const { error } = await clientSideOpenapiClient.PUT("/api/v2/posts/{boardId}", {
        params: {
          path: {
            boardId: Number(boardId)
          }
        },
        body
      });

      if (error) {
        toastMessage.error("포스트 수정에 실패했습니다.");
        throw new Error("포스트 수정 페이지에서 에러가 발생했습니다.");
      }

      // 글 수정이 되었을 때
      toastMessage.success("게시물이 수정되었습니다.");

      // 상세 글 캐싱 무효화
      queryClient.invalidateQueries({
        queryKey: POST_DETAIL_QUERY_KEYS.detail(boardId!)
      });

      // 글 목록 페이지로 돌아가기
      router.replace(`/board/?page=${searchParams.get("page")}`);
      return;
    }

    // -> 글을 작성할 때
    const { error } = await clientSideOpenapiClient.POST("/api/v2/posts", { body });

    if (error) {
      toastMessage.error("이미 글이 존재합니다.");
      return;
    }

    toastMessage.success("게시물이 작성되었습니다.");
    router.replace(`/board/?page=${searchParams.get("page")}`);

    queryClient.invalidateQueries({
      queryKey: [POST_QUERYKEYS.PostList]
    });
  };

  if (!userInfo) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <ModalContainer userInfo={userInfo}>
          <div className="mt-[30px] space-y-[30px] *:space-y-[6px]">
            {/* 포지션 */}
            <div>
              <p className="semibold-14">포지션</p>
              <div className="flex items-center gap-[8px] *:w-1/2">
                <MainAndSubPosition />
                <input
                  type="hidden"
                  {...methods.register("mainPosition", {
                    required: true
                  })}
                />

                <WantPosition />
                <input
                  type="hidden"
                  {...methods.register("wantMainPosition", {
                    validate: (_, formValues) =>
                      formValues.wantMainPosition || formValues.wantSubPosition
                        ? true
                        : "원하는 포지션을 하나 이상 선택해주세요"
                  })}
                />
              </div>
            </div>

            {/* 선호 게임 모드 */}
            <div>
              <p className="semibold-14">선호 게임 모드</p>
              <PreferredGameMode />
            </div>

            {/* 게임 스타일 */}
            <div>
              <p className="semibold-14">게임 스타일</p>
              <SelectGameStyle />
              <input
                type="hidden"
                {...methods.register("gameStyles", {
                  validate: (value) => value.length > 0
                })}
              />
            </div>

            {/* 마이크 스위치 */}
            <div>
              <p>마이크</p>
              <MicSwitch />
            </div>

            {/* 한마디 */}
            <div>
              <p>한마디</p>
              <Comment />
            </div>

            <Button
              className={cn("h-[58px] w-full bg-violet-400 text-white", isValid && "bg-violet-600")}
              type="submit"
              disabled={!isValid}
            >
              작성 완료
            </Button>
          </div>
        </ModalContainer>
      </form>
    </FormProvider>
  );
}
