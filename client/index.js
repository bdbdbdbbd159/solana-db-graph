import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

const connection = new Connection("https://api.testnet.solana.com", "confirmed");
const wallet = anchor.Wallet.local();  // assumes keypair in ~/.config/solana/id.json
const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
anchor.setProvider(provider);

import { SolanaDb } from "./solana_db.js"; // generated IDL client

const program = new anchor.Program(SolanaDb, new PublicKey("YourProgramIDHere"), provider);

async function createRecord(key, value) {
    const record = anchor.web3.Keypair.generate();
    await program.rpc.createRecord(key, value, {
        accounts: {
            record: record.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        },
        signers: [record]
    });
    console.log("Created record:", record.publicKey.toBase58());
}

createRecord("name", "Alice");
