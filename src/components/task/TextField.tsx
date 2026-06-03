"use client";

import {Description, Input, Label, TextArea, TextField,Button} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  return (
    <div className="flex w-full max-w-64 flex-col gap-4 TextField">
      <TextField name="name" value={name} onChange={setName}>
        <Label>Username:</Label>
        <Input placeholder="e.g: Sebastian" />
        <Description>Characters: {name.length}</Description>
      </TextField>
      <TextField name="bio" value={bio} onChange={setBio}>
        <Label>Description</Label>
        <TextArea placeholder="Put your description" />
        <Description>Characters: {bio.length} / 200</Description>
        <Button type="button">Apply</Button>
      </TextField>
    </div>
  );
}