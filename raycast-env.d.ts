/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Shell Type - Select your shell type */
  "shellType": "zsh" | "bash",
  /** Backup Location - Directory to store shell configuration backups */
  "backupLocation": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `optimize-shell` command */
  export type OptimizeShell = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `optimize-shell` command */
  export type OptimizeShell = {}
}

