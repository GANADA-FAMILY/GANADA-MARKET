import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();

  return <h1>Post: {slug}</h1>;
}
