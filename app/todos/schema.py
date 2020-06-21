from marshmallow import Schema, fields


class TodoSchema(Schema):
    id = fields.UUID(required=True)
    project_id = fields.Str()
    name = fields.Str()
    checked = fields.Boolean()
    due_date = fields.DateTime('%Y-%m-%d')


class UserTodoSchema(TodoSchema):
    user_id = fields.Email(required=True)