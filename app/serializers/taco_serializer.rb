class TacoSerializer < ActiveModel::Serializer
  attributes :id, :meat, :rice, :salsa, :notes
end
