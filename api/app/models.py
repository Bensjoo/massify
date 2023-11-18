from sqlalchemy import Column, Integer, String, Boolean  # , Float, DateTime

from app.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    nick_name = Column(String)
    is_admin = Column(Boolean, default=False)
    # TODO: password management


# class Beer(Base):
#     __tablename__ = "beers"

#     id = Column(Integer, primary_key=True, index=True)
#     short_name = Column(String)
#     full_name = Column(String)
#     abv = Column(Float, default=5.2)


# class Session(Base):
#     __tablename__ = "sessions"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     participants = Column(String)
#     started = Column(DateTime)
#     ended = Column(DateTime)


# class Rating(Base):
#     __tablename__ = "ratings"
#     id = Column(Integer, primary_key=True, index=True)
