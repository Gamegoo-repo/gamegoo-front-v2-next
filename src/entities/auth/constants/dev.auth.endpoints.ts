export const DEV_AUTH_ENDPOINTS = {
    postDevAuth: (memberId: number) =>
        [
            '/home/tokens/{memberId}',
            {
                params: {
                    path: {
                        memberId,
                    },
                },
            },
        ] as const,
};
