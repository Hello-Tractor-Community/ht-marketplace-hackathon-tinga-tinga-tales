import {encodeBase32UpperCaseNoPadding} from "@oslojs/encoding";

export function generateRandomOTP(): string {
    const array = new Uint8Array(6);
    crypto.getRandomValues(array);
    return Array.from(array, byte => (byte % 10).toString()).join('');
}

export function generateRandomRecoveryCode(): string {
    const recoveryCodeBytes = new Uint8Array(10);
    crypto.getRandomValues(recoveryCodeBytes);
    return encodeBase32UpperCaseNoPadding(recoveryCodeBytes);
}