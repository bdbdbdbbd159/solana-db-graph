use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgE3sH5UuKjt");

#[program]
pub mod solana_db {
    use super::*;

    pub fn create_record(ctx: Context<CreateRecord>, key: String, value: String) -> Result<()> {
        let record = &mut ctx.accounts.record;
        record.key = key;
        record.value = value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateRecord<'info> {
    #[account(init, payer = user, space = 9000)]
    pub record: Account<'info, Record>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Record {
    pub key: String,
    pub value: String,
}
