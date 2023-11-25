from datetime import datetime
from sqlalchemy import (
    Column, ForeignKey, Integer, String, Boolean, DateTime,  # Float,
    Table,
)
from sqlalchemy.orm import relationship
from app.database import Base


# many-to-many relationship
# Association tables for many-to-many relationships
tasting_participants = Table(
    'tasting_participants',
    Base.metadata,
    Column('tasting_id', Integer, ForeignKey('tastings.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

# tasting_beers = Table(
#     'tasting_beers',
#     Base.metadata,
#     Column('tasting_id', Integer, ForeignKey('tastings.id')),
#     Column('beer_id', Integer, ForeignKey('beers.id'))
# )


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    nick_name = Column(String)
    is_admin = Column(Boolean, default=False)
    # TODO: password management


# class Beer(Base):
#     __tablename__ = "beers"

#     id = Column(Integer, primary_key=True, index=True)
#     full_name = Column(String)
#     short_name = Column(String)
#     brewery = Column(String)
#     bolaget_number = Column(Integer)
#     abv = Column(Float, default=5.2)


class Tasting(Base):
    __tablename__ = "tastings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    started = Column(DateTime, default=datetime.utcnow)
    ended = Column(DateTime, nullable=True)
    participants = relationship("User", secondary=tasting_participants)
    # beers = relationship("Beer", secondary=tasting_beers)


# class Rating(Base):
#     __tablename__ = 'ratings'
#     rating_id = Column(Integer, primary_key=True)
#     score = Column(Float)
#     feeling = Column(Float)
#     comment = Column(String)
#     submitted = Column(DateTime)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     beer_id = Column(Integer, ForeignKey('beers.id'))
#     tasting_id = Column(
#         Integer,
#         ForeignKey('tastings.id'),
#         nullable=True
#     )

#     # Relationships
#     user = relationship("User")
#     beer = relationship("Beer")
#     tasting = relationship("Tasting", back_populates="ratings")
