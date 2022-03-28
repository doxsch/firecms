import React from "react";
import { Grid } from "@mui/material";
import {
    StringPropertyValidation
} from "./validation/StringPropertyValidation";

export function StringPropertyFieldAdvanced({
                                                widgetId
                                            }: {
    widgetId: "text_field" | "multiline" | "markdown" | "url" | "email";
}) {

    return (
        <>
            <Grid item>
                    {widgetId === "text_field" &&
                        <StringPropertyValidation length={true}
                                                  lowercase={true}
                                                  matches={true}
                                                  max={true}
                                                  min={true}
                                                  trim={true}
                                                  uppercase={true}/>}
                    {widgetId === "multiline" &&
                        <StringPropertyValidation length={true}
                                                  lowercase={true}
                                                  max={true}
                                                  min={true}
                                                  trim={true}
                                                  uppercase={true}/>}
                    {widgetId === "markdown" &&
                        <StringPropertyValidation length={true}
                                                  lowercase={true}
                                                  max={true}
                                                  min={true}
                                                  trim={true}
                                                  uppercase={true}/>}
                    {widgetId === "url" &&
                        <StringPropertyValidation
                            max={true}
                            min={true}
                            trim={true}/>}

                    {widgetId === "email" &&
                        <StringPropertyValidation
                            max={true}
                            min={true}
                            trim={true}/>}
            </Grid>
        </>
    );
}