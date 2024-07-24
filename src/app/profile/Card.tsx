"use client";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faPenToSquare);

interface CardProps {
  MONGOID: string;
  ID: number;
  NAME: string;
  STATUS: string;
  CREATED_AT: string;
  PDF: string;
  WORD: string;
}

function Card({
  ID,
  MONGOID,
  NAME,
  CREATED_AT,
  STATUS,
  PDF,
  WORD,
}: CardProps) {
  return (
    <div className="p-1 flex flex-col justify-center items-start gap-5 w-full custom-border">
      <p className="text-gray-600  flex items-center">
        <span className="text-gray-500 font-bold tracking-wider uppercase text-xs pr-1">
          ID:{" "}
        </span>
        {ID}
      </p>
      <p className="text-gray-600  flex items-center leading-5">
        <span className="text-gray-500 font-bold tracking-wider uppercase text-xs pr-1">
          Name:{" "}
        </span>
        {NAME}
      </p>
      <p className="text-gray-600  flex items-center">
        <span className="text-gray-500 font-bold tracking-wider uppercase text-xs pr-1">
          Created At:{" "}
        </span>
        {CREATED_AT}
      </p>
      <div className="flex justify-center items-center gap-2">
        <span className="text-gray-500 font-bold tracking-wider uppercase text-xs pr-1">
          Status:{" "}
        </span>
        <p
          className={`pill  ${
            STATUS === "Generating"
              ? "bg-yellow-200 text-yellow-800"
              : STATUS === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {STATUS}
        </p>
      </div>

    </div>
  );
}

export default Card;
