"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { UserInfo } from "@/entities/auth";

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
import { useEditPostMutation } from "@/features/post/model/hooks/queries/useEditPostMutation";
import { usePostMutation } from "@/features/post/model/hooks/queries/usePostMutation";

type PostProps = {
  boardId?: string;
  postData: BoardData;
  userInfo: UserInfo;
};

export function Post({ boardId, postData, userInfo }: PostProps) {
  const editPost = useEditPostMutation();
  const post = usePostMutation();

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
      editPost.mutate({ body, boardId: Number(boardId!) });
      return;
    }

    // -> 글을 작성할 때
    post.mutate({ body });
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
