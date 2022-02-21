import React from "react";
import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";

import { PreviewComponent, PreviewComponentProps } from "../internal";
import { ResolvedMapProperty } from "../../models";
import { ErrorBoundary } from "../../core/internal/ErrorBoundary";

/**
 * @category Preview components
 */
export function MapPreview<T extends Record<string, unknown>>({
                                             name,
                                             value,
                                             property,
                                             size
                                         }: PreviewComponentProps<T>) {



    if (property.dataType !== "map") {
        throw Error("Picked wrong preview component MapPreview");
    }

    const mapProperty = property as ResolvedMapProperty;
    if (!mapProperty.properties) {
        throw Error(`You need to specify a 'properties' prop (or specify a custom field) in your map property ${name}`);
    }

    if (!value) return null;


    let mapPropertyKeys: string[];
    if (size === "regular") {
        mapPropertyKeys = Object.keys(mapProperty.properties);
    } else {
        mapPropertyKeys = (mapProperty.previewProperties || Object.keys(mapProperty.properties)) as string[];
        if (size === "small")
            mapPropertyKeys = mapPropertyKeys.slice(0, 3);
        else if (size === "tiny")
            mapPropertyKeys = mapPropertyKeys.slice(0, 1);
    }

    if (size !== "regular")
        return (
            <>
                {mapPropertyKeys.map((key, index) => (
                    <div
                        key={"map_preview_" + mapProperty.title + key + index}>
                        <ErrorBoundary>
                            <PreviewComponent name={key}
                                              value={(value as any)[key]}
                                              property={mapProperty.properties![key]}
                                              size={size}/>
                        </ErrorBoundary>
                    </div>
                ))}
            </>
        );

    return (
        <Table size="small" key={`map_preview_${name}`}>
            <TableBody>
                {mapPropertyKeys &&
                mapPropertyKeys.map((key, index) => {
                    return (
                        <TableRow
                            key={`map_preview_table_${name}_${index}`}
                            sx={{
                                "&:last-child th, &:last-child td": {
                                    borderBottom: 0
                                }
                            }}>
                            <TableCell key={`table-cell-title-${name}-${key}`}
                                       sx={{
                                           verticalAlign: "top"
                                       }}
                                       width="30%"
                                       component="th">
                                <Typography variant={"caption"}
                                            color={"textSecondary"}>
                                    {mapProperty.properties![key].title}
                                </Typography>
                            </TableCell>
                            <TableCell key={`table-cell-${name}-${key}`}
                                       width="70%"
                                       component="th">
                                <ErrorBoundary>
                                    <PreviewComponent
                                        name={key}
                                        value={(value as any)[key]}
                                        property={mapProperty.properties![key]}
                                        size={"small"}/>
                                </ErrorBoundary>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );

}