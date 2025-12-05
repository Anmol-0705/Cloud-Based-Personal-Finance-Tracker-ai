<%!
from alembic import util
%>
"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}
"""
from alembic import op
import sqlalchemy as sa
${imports if imports else ""}

${upgrades if upgrades else "def upgrade():\n    pass\n"}
${downgrades if downgrades else "def downgrade():\n    pass\n"}
