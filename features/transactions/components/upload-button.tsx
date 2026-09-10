"use client";

import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
    onUpload: (results: { data: string[][] }) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: { getRootProps: () => Record<string, unknown> }) => (
                <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
                    <Upload className="size-4 mr-2" />
                    Importar
                </Button>
            )}
        </CSVReader>
    );
};
