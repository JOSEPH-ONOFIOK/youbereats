export type CardNumber = string;

export type CardExpiry = Date;

export type CardVerificationValue = number;

export type DebitCard = {
    full_name: string;
    card_number: CardNumber;
    expiry: CardExpiry;
    cvv: CardVerificationValue;
}

export type CardDetails = DebitCard[];

