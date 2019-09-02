const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 物品名称
    name: {
        type: String
    },
    // 头像 
    avatar: {
        type: String
    },
    // 称号
    title: {
        type: String
    },
    // 英雄分类,英雄可能有多个分类，所以用个数组保存
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    // 英雄评分，是一个对象
    scores: {
        // 难度
        difficult: {
            type: Number
        },
        // 技能
        skills: {
            type: Number
        },
        // 攻击
        attack: {
            type: Number
        },
        // 生存
        survive: {
            type: Number
        },
    },
    // 技能
    skills: [{
        icon: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        tips: {
            type: String
        }
    }],
    // 顺风出装,只要是外键关联的就是type:mongoose.SchemaTypes.ObjectId,这里关联到了物品分类
    items1: [{type:
        mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 顺风出装,
    items2: [{type:
        mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 使用技巧
    usageTips:{type:String},
    // 对抗技巧
    battleTips:{type:String},
    // 团战思路
    teamTips:{type:String},
    // 最佳搭档
    partners:[{
        // 英雄，关联自己
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        // 描述，为什么是最佳搭档
        description:{type:String}
    }]

})
    // 第三个参数指定数据库表名
module.exports = mongoose.model('Hero', schema,'heroes')