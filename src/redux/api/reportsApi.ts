import { baseApi } from "./baseApi";

interface IDownloadInput {
  url: string;
  filename: string;
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadReport: builder.mutation<void, IDownloadInput>({
      queryFn: async (arg, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: arg.url,
          method: "GET",
          responseHandler: (response: Response) => response.blob(),
          cache: "no-cache",
        });
        if (result.error) return { error: result.error };

        const blob = result.data as Blob;
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = arg.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

        return { data: undefined };
      },
    }),
  }),
});

export const { useDownloadReportMutation } = reportsApi;
