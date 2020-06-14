from marshmallow import Schema, fields


class ProjectSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str()
    due_date = fields.DateTime('%Y-%m-%d')


class UserProjectSchema(ProjectSchema):
    user_id = fields.Email(required=True)