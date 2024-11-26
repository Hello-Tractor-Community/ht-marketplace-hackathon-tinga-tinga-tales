import React from "react";

export default function ContentHeader({header, sub}: { header: string, sub: string }) {
    return (
        <div className={"flex flex-col gap-2 w-full p-4"}>
            <h1 className={"text-4xl text-secondary font-semibold tracking-tight"}>{header}</h1>
            <span className={"text-xs opacity-50"}>{sub}</span>
        </div>
    );
}
