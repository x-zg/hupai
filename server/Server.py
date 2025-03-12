#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2025-03-12 13:39
# @Site    :
# @File    : Server.py
# @Software: PyCharm
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 存储房间信息，简单模拟，实际生产中需要持久化存储
rooms = {}

# 定义请求体模型
class RoomCreateRequest(BaseModel):
    roomId: str
    password: str

class RoomJoinRequest(BaseModel):
    roomId: str
    password: str

# 创建房间接口
@app.post("/createRoom")
async def create_room(request: RoomCreateRequest):
    room_id = request.roomId
    password = request.password
    if room_id in rooms:
        return {"error": "房间已存在"}
    rooms[room_id] = {"password": password, "players": []}
    return {"message": "房间创建成功"}

# 加入房间接口
@app.post("/joinRoom")
async def join_room(request: RoomJoinRequest):
    room_id = request.roomId
    password = request.password
    room = rooms.get(room_id)
    if not room:
        return {"error": "房间不存在"}
    if room["password"] != password:
        return {"error": "密码错误"}
    if len(room["players"]) >= 4:
        return {"error": "房间已满"}
    # 这里可以添加玩家信息到房间的 players 数组中
    room["players"].append("新玩家")  # 简单示例，实际应传入玩家信息
    return {"message": "加入房间成功"}

# 获取房间玩家数量接口
@app.get("/roomPlayers/{roomId}")
async def get_room_players(roomId: str):
    room = rooms.get(roomId)
    if not room:
        return {"error": "房间不存在"}
    return {"playerCount": len(room["players"])}

if __name__ == '__main__':
    uvicorn.run("Server:app", host="127.0.0.1", port=8000, reload=True)
