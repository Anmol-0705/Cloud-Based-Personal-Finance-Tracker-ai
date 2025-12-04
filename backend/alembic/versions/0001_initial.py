"""initial

Revision ID: 0001_initial
Revises: 
Create Date: 2025-12-04 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy.dialects.postgresql as psql
from sqlalchemy.sql import func

# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated ###

    op.create_table('users',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=True),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.UniqueConstraint('email')
    )

    op.create_table('families',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('owner_user_id', psql.UUID(as_uuid=True), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    )

    op.create_table('family_members',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('family_id', psql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', psql.UUID(as_uuid=True), nullable=False),
        sa.Column('role', sa.Enum('owner','member','viewer', name='roleenum'), nullable=True),
        sa.Column('nickname', sa.String(length=100), nullable=True),
    )
    op.create_foreign_key('fk_family_members_family', 'family_members', 'families', ['family_id'], ['id'])
    op.create_foreign_key('fk_family_members_user', 'family_members', 'users', ['user_id'], ['id'])

    op.create_table('accounts',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('family_id', psql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=True),
        sa.Column('type', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    )
    op.create_foreign_key('fk_accounts_family', 'accounts', 'families', ['family_id'], ['id'])

    op.create_table('categories',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('family_id', psql.UUID(as_uuid=True), nullable=True),
        sa.Column('name', sa.String(length=100), nullable=False),
    )

    op.create_table('transactions',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('account_id', psql.UUID(as_uuid=True), nullable=True),
        sa.Column('user_id', psql.UUID(as_uuid=True), nullable=True),
        sa.Column('family_id', psql.UUID(as_uuid=True), nullable=True),
        sa.Column('amount', sa.Numeric(10, 2), nullable=False),
        sa.Column('currency', sa.String(length=10), nullable=True),
        sa.Column('date', sa.DateTime(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('merchant', sa.String(length=255), nullable=True),
        sa.Column('category', sa.String(length=100), nullable=True),
        sa.Column('is_recurring', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    )
    op.create_foreign_key('fk_transactions_account', 'transactions', 'accounts', ['account_id'], ['id'])
    op.create_foreign_key('fk_transactions_user', 'transactions', 'users', ['user_id'], ['id'])
    op.create_foreign_key('fk_transactions_family', 'transactions', 'families', ['family_id'], ['id'])

    op.create_table('budgets',
        sa.Column('id', psql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('family_id', psql.UUID(as_uuid=True), nullable=False),
        sa.Column('category', sa.String(length=100), nullable=True),
        sa.Column('limit_amount', sa.Numeric(12, 2), nullable=True),
        sa.Column('period', sa.String(length=20), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    )
    op.create_foreign_key('fk_budgets_family', 'budgets', 'families', ['family_id'], ['id'])

    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated ###
    op.drop_constraint('fk_budgets_family', 'budgets', type_='foreignkey')
    op.drop_table('budgets')

    op.drop_constraint('fk_transactions_family', 'transactions', type_='foreignkey')
    op.drop_constraint('fk_transactions_user', 'transactions', type_='foreignkey')
    op.drop_constraint('fk_transactions_account', 'transactions', type_='foreignkey')
    op.drop_table('transactions')

    op.drop_table('categories')

    op.drop_constraint('fk_accounts_family', 'accounts', type_='foreignkey')
    op.drop_table('accounts')

    op.drop_constraint('fk_family_members_user', 'family_members', type_='foreignkey')
    op.drop_constraint('fk_family_members_family', 'family_members', type_='foreignkey')
    op.drop_table('family_members')

    op.drop_table('families')

    op.drop_table('users')

    # drop enum type if created
    op.execute("DROP TYPE IF EXISTS roleenum;")
    # ### end Alembic commands ###
