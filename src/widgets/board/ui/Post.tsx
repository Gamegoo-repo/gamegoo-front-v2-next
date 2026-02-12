"use client";

import { useEffect } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";
import { DialogModal } from "@/shared/ui/dialog";

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
        <DialogModal
          name={userInfo.gameName}
          description="글 작성"
          imgNum={userInfo.profileImg}
          tag={userInfo.tag}
          routeBack
          items={[
            {
              id: "position",
              content: <PositionSection methods={methods} />
            },
            {
              id: "preferredGameMode",
              content: <PreferredGameModeSection />
            },
            {
              id: "gameStyle",
              content: <GameStyleSection methods={methods} />
            },
            {
              id: "mic",
              content: <MicSection />
            },
            {
              id: "comment",
              content: <CommentSection />
            },
            {
              id: "submit",
              content: <SubmitSection isValid={isValid} />
            }
          ]}
        />
      </form>
    </FormProvider>
  );
}

// eslint-disable-next-line
type Methods = UseFormReturn<PostForm, any, PostForm>;

function PositionSection({ methods }: { methods: Methods }) {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">포지션</h3>

      <div className="flex items-center gap-4 *:flex-1">
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
    </section>
  );
}

function PreferredGameModeSection() {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">선호 게임 모드</h3>

      <div className="flex gap-4">
        <div className="w-1/2">
          <PreferredGameMode />
        </div>

        <div className="invisible w-1/2" />
      </div>
    </section>
  );
}

function GameStyleSection({ methods }: { methods: Methods }) {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">게임 스타일</h3>

      <SelectGameStyle />
      <input
        type="hidden"
        {...methods.register("gameStyles", {
          validate: (value) => value.length > 0
        })}
      />
    </section>
  );
}

function MicSection() {
  return (
    <section className="space-y-2">
      <h3 className="semibold-14">마이크</h3>

      <MicSwitch />
    </section>
  );
}

function CommentSection() {
  return (
    <section className="space-y-2">
      <h3>한마디</h3>

      <Comment />
    </section>
  );
}

function SubmitSection({ isValid }: { isValid: boolean }) {
  return (
    <Button
      className={cn("h-14 w-full bg-violet-400 text-white", isValid && "bg-violet-600")}
      type="submit"
      disabled={!isValid}
    >
      작성 완료
    </Button>
  );
}
