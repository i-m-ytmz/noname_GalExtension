'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "星河萌璨", // 扩展包的内部名称
        content: function (config, pack) {
        },
        precontent: function () { },
        config: {},
        help: {},

        // ================= 【核心包裹层】 =================
        package: {

            // ---------------- 1. 武将注册区 ----------------
            character: {
                // 1.1 登记武将的基本属性（性别、势力、血量、拥有的技能、武将描述和立绘路径）
                character: {

                    //藏女
                    "ms_cangnv": ["female", "qun", 5, ["ms_lanyu", "ms_lanai", "ms_qiming"], ["des:【藏女】", "ext:xinghe/ms_cangnv.jpg"]],
                    //春日伊吕波
                    "ms_harukairubo": ["female", "qun", 3, ["ms_gongpo", "ms_qidao"], ["des:【春日伊吕波】", "ext:xinghe/ms_harukairubo.jpg"]],
                    //龙胆
                    "ms_rindou": ["female", "qun", 3, ["ms_zuoxiang", "ms_zhiming"], ["des:謎の住人。<br>透き通るほどに白い、アルビノの少女。屋敷の奥で生活しているらしく、普段、顔を出すことは滅多にない。<br>「神樹の館」の守り神的存在。住人たちの間では、一種のタブーとして畏れ、敬われている。<br>彼女の意思ひとつで、館はその姿を変貌させる。", "ext:xinghe/ms_rindou.jpg"]],
                    //利西亚
                    "ms_licia": ["female", "qun", "2/3", ["ms_binhun", "ms_tuien", "ms_luangang"], ["des:王家第一皇女，亦即皇位第一继承人。<br>因为现任王卧床不起，目前由她作为代理执掌政务。<br>虽然贵族中也有人讽刺还没继位的她为「无冠的女王」，但她本人并不以为意。", "ext:xinghe/ms_licia.jpg"]],
                    //灰流
                    "ms_huiliu": ["male", "qun", 3, ["ms_dianlu", "ms_fengliu"], ["des:神秘的存在。<br>她的出现总是伴随着不寻常的事件。", "ext:xinghe/ms_huiliu.jpg"]],
                    //榊原拓
                    "ms_shenyuantuo": ["male", "shen", "4/6", ["ms_gouzao", "ms_dedao", "ms_manman"], ["des:八月一号人物。", "shengroup:true", "ext:xinghe/ms_shenyuantuo.jpg"]],
                    //白皇女
                    "ms_baihuangnv": ["female", "qun", 4, ["ms_zhishi"], ["des:乱世之枭雄。", "ext:xinghe/ms_baihuangnv.jpg"]],
                    //苍蓝星
                    "ms_canglanxing": ["female", "qun", 4, ["ms_jiuku", "ms_nichang"], ["des:苍蓝星。", "ext:xinghe/ms_canglanxing.jpg"]],
                    //龙宫礼奈
                    "ms_rena": ["female", "qun", "2/3", ["ms_longzhan", "ms_konghe", "ms_zaodong"], ["des:龙宫礼奈。", "ext:xinghe/ms_rena.jpg"]],
                    //尤斯缇雅
                    "ms_Eustia": ["female", "qun", "3/4", ["ms_tianshi", "ms_chuhui", "ms_poxing"], ["des:尤斯缇雅。", "ext:xinghe/ms_Eustia.jpg"]],
                    //银子
                    "ms_yinzi": ["female", "qun", 0, ["ms_huahai", "ms_dengxian", "ms_shanlao"], ["des:银子。", "ext:xinghe/ms_yinzi.jpg"]],
                    //月社妃
                    "ms_Kisaki": ["female", "qun", 3, ["ms_mengyan", "ms_edu", "ms_yeyan"], ["des:月社妃。<br>【业火】是一种月社妃独有的锦囊牌，其效果是：从使用者开始，使用者与所有目标角色需轮流打出一张【杀】，直到有角色未打出。其受到 X+1 点伤害（X为期间打出【杀】的数量）随后：<br>若此牌是火属性，该角色摸目标数张牌，否则其获得除使用者外的所有目标角色一张牌。", "ext:xinghe/ms_Kisaki.jpg"]],


                },

                // 1.2 登记所有需要在游戏界面中显示的中文翻译
                translate: {

                    // --- 武将名字翻译 ---
                    "ms_cangnv": "藏女",
                    "ms_harukairubo": "春日伊吕波",
                    "ms_rindou": "龙胆",
                    "ms_licia": "利西亚",
                    "ms_huiliu": "灰流",
                    "ms_shenyuantuo": "榊原拓",
                    "ms_baihuangnv": "白皇女",
                    "ms_canglanxing": "苍蓝星",
                    "ms_rena": "龙宫礼奈",
                    "ms_Eustia": "尤斯缇雅",
                    "ms_yinzi": "银子",
                    "ms_Kisaki": "月社妃",
                }
            },

            // ---------------- 2. 卡牌注册区 ----------------
            card: {
                card: {
                    "yehuo": {
                        type: "trick",
                        tags: ["damage"],
                        content: function () {
                            "step 0"
                            if (event.target !== event.targets[0]) {
                                event.finish();
                                return;
                            }

                            event.turnList = [event.player].concat(event.targets);
                            event.turnList = event.turnList.unique();

                            event.currentIndex = 0;
                            event.shaCount = 0;
                            event.lastPlayed = null;

                            "step 1"
                            var current = event.turnList[event.currentIndex];
                            var natureStr = event.card.nature ? get.translation(event.card.nature) + '属性' : '';
                            var prompt = '业火：请打出一张【杀】，否则将受到 ' + (event.shaCount + 1) + ' 点' + natureStr + '伤害';

                            current.chooseToRespond(prompt, { name: 'sha' }).set('ai', function (card) {
                                return 1;
                            });

                            "step 2"
                            var current = event.turnList[event.currentIndex];
                            if (result.bool) {
                                event.shaCount++;
                                event.lastPlayed = current;

                                event.currentIndex++;
                                if (event.currentIndex >= event.turnList.length) {
                                    event.currentIndex = 0;
                                }
                                event.goto(1);
                            } else {
                                // 未能打出杀，轮盘停止，承受伤害
                                event.failedPlayer = current;

                                // 【核心修改】：无论轮盘转了多久，伤害来源始终固定为该卡牌的使用者
                                var source = event.player;

                                event.failedPlayer.damage(event.shaCount + 1, event.card.nature, source);
                            }

                            "step 3"
                            // 【核心修改】：根据属性进行分支结算
                            if (event.failedPlayer.isAlive()) {
                                if (event.card.nature === 'fire') {
                                    // 火属性：摸目标数张牌，然后直接结束卡牌结算
                                    event.failedPlayer.draw(event.targets.length);
                                    game.log(event.failedPlayer, '触发了火属性', '#r【业火】', '的特殊效果，摸了', event.targets.length, '张牌');
                                    event.finish();
                                } else {
                                    // 雷属性或普通属性：走原本的抢牌流程
                                    event.victims = event.targets.slice();
                                    event.victims.remove(event.player);
                                    event.robIndex = 0;
                                }
                            } else {
                                event.finish();
                            }

                            "step 4"
                            // 抢牌循环（只有雷属性和普通属性会走到这里）
                            if (event.victims && event.robIndex < event.victims.length) {
                                var victim = event.victims[event.robIndex];
                                if (victim !== event.failedPlayer && victim.countCards('he') > 0 && victim.isAlive()) {
                                    event.failedPlayer.gainPlayerCard(victim, 'he', true);
                                }
                                event.robIndex++;
                                event.goto(4);
                            }
                        }
                    },
                },
                translate: {
                    "yehuo": "业火",
                    "yehuo_info": "从使用者开始，使用者与所有目标角色需轮流打出一张【杀】，直到有角色未打出。其受到 X+1 点伤害（X为期间打出【杀】的数量）随后：<br>若此牌是火属性，该角色摸目标数张牌，否则其获得除使用者外的所有目标角色一张牌。"
                },
                list: [] // 衍生牌不需要洗入牌堆，保持为空
            },

            // ---------------- 3. 技能代码区 ----------------
            skill: {
                skill: {

                    //—————————————————————————————藏女的技能—————————————————————————————————

                    ms_lanyu: {
                        audio: 2,
                        trigger: { player: 'gainAfter' },
                        forced: true,
                        onremove: function (player) {
                            player.storage.ms_lanyu_executing = false;
                            player.storage.ms_lanyu_queue = 0;
                            player.storage.ms_lanyu_count = 0;
                        },
                        filter: function (event, player) {
                            var count = player.storage.ms_lanyu_count || 0;
                            if (count >= player.getSkills().length) return false;

                            if (player.storage.ms_lanyu_executing) {
                                player.storage.ms_lanyu_queue = (player.storage.ms_lanyu_queue || 0) + 1;
                                return false;
                            }
                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.storage.ms_lanyu_executing = true;

                            "step 1"
                            event.giveSkill = false;
                            player.storage.ms_lanyu_count = (player.storage.ms_lanyu_count || 0) + 1;
                            player.draw();

                            "step 2"
                            var suits = [];
                            var cards = player.getCards('h');
                            for (var i = 0; i < cards.length; i++) {
                                var suit = get.suit(cards[i], player);
                                if (lib.suit.includes(suit)) suits.add(suit);
                            }
                            if (suits.length >= 4) {
                                // 【核心修改点】动态生成选项列表
                                var list = ['失去一点体力'];
                                if (!_status.ms_lanyu_given) {
                                    list.push('将此技能交给一名其他角色');
                                }
                                player.chooseControl(list, function () {
                                    // 如果选项里有给技能，且自己快死了，才给技能；否则优先扣血
                                    if (list.includes('将此技能交给一名其他角色') && player.hp <= 1) return '将此技能交给一名其他角色';
                                    return '失去一点体力';
                                }).set('prompt', '【婪欲】你的手牌已凑齐四种花色，请选择一项');
                            } else {
                                event.goto(4);
                            }

                            "step 3"
                            if (result.control === '失去一点体力') {
                                player.loseHp(1);
                            } else {
                                // 【核心修改点】记录本回合该技能已被传递过
                                _status.ms_lanyu_given = true;
                                player.chooseTarget('选择一名其他角色将【婪欲】交给他', function (card, player, target) {
                                    return target !== player && !target.hasSkill('ms_lanyu');
                                }, true).set('ai', function (target) {
                                    return -get.attitude(_status.event.player, target);
                                });
                                event.giveSkill = true;
                            }

                            "step 4"
                            if (event.giveSkill && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                player.removeSkill('ms_lanyu');
                                target.addSkill('ms_lanyu');
                                game.log(player, '将技能', '#g【婪欲】', '交给了', target);

                                player.storage.ms_lanyu_queue = 0;
                                player.storage.ms_lanyu_executing = false;
                                event.finish();
                                return;
                            }

                            "step 5"
                            var count = player.storage.ms_lanyu_count || 0;
                            if (player.storage.ms_lanyu_queue > 0 && count < player.getSkills().length) {
                                player.storage.ms_lanyu_queue--;
                                event.goto(1);
                            } else {
                                player.storage.ms_lanyu_executing = false;
                            }
                        },
                        subSkill: {
                            refresh: {
                                trigger: { player: 'useCardAfter' },
                                forced: true,
                                silent: true,
                                content: function () {
                                    player.storage.ms_lanyu_count = 0;
                                }
                            },
                            clear: {
                                // 【核心修改点】每回合结束时，清除传递限制标记
                                trigger: { global: 'phaseAfter' },
                                forced: true,
                                silent: true,
                                content: function () {
                                    delete _status.ms_lanyu_given;
                                }
                            }
                        },
                        group: ['ms_lanyu_refresh', 'ms_lanyu_clear']
                    },

                    ms_lanai: {
                        audio: 2,
                        forced: true,
                        mark: true,
                        marktext: "婪",
                        intro: {
                            name: "婪爱 · 已消耗花色",
                            content: function (storage, player) {
                                var suits = player.storage.ms_lanai || [];
                                if (suits.length === 0) return "本回合暂未通过【婪爱】消耗过花色";
                                var map = {
                                    spade: '<span style="color:black;font-weight:bold;">♠ 黑桃</span>',
                                    heart: '<span style="color:red;font-weight:bold;">♥ 红桃</span>',
                                    club: '<span style="color:black;font-weight:bold;">♣ 梅花</span>',
                                    diamond: '<span style="color:red;font-weight:bold;">♦ 方块</span>'
                                };
                                return "本回合已使用：<br>" + suits.map(function (s) { return map[s] || s; }).join("<br>");
                            }
                        },
                        trigger: {
                            player: "useCardAfter",
                        },
                        // 【核心声明】：把前置记录子技能 record 绑定到主技能群中！
                        group: ["ms_lanai_record", "ms_lanai_clear"],
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (player.storage.ms_lanai_unlimited) return Infinity;
                            }
                        },
                        filter: function (event, player) {
                            var suit = get.suit(event.card, player);
                            if (!suit || suit === 'none') return false;
                            return player.hasCard(function (c) {
                                return get.suit(c, player) === suit;
                            }, 'h');
                        },
                        content: function () {
                            'step 0'
                            player.storage.ms_lanai_unlimited = true;
                            var canChoice3 = player.hasCard(function (card) {
                                var s = get.suit(card, player);
                                if (!s || s === 'none') return false;

                                var used = player.storage.ms_lanai || [];
                                if (used.includes(s)) return false;

                                if (!lib.filter.filterCard(card, player, _status.event)) return false;
                                if (!player.hasUseTarget(card, false, _status.event)) return false;

                                return true;
                            }, 'h');
                            delete player.storage.ms_lanai_unlimited;

                            var choices = ['opt1'];
                            var choiceList = ['失去1点体力'];

                            if (!player.storage.ms_lanai_opt2 && game.hasPlayer(function (current) { return current !== player && !current.hasSkill('ms_lanai'); })) {
                                choices.push('opt2');
                                choiceList.push('将【婪爱】交给一名其他角色（每回合限一次）');
                            }

                            if (canChoice3) {
                                choices.push('opt3');
                                choiceList.push('展示并使用一张本回合你未以此法使用过花色的牌（无次数限制）');
                            }

                            player.chooseControl(choices)
                                .set('choiceList', choiceList)
                                .set('prompt', '【婪爱】触发：手牌中有同花色的牌，请选择一项执行：');

                            'step 1'
                            event.choice = result.control;

                            if (event.choice === 'opt1') {
                                player.loseHp(1);
                                event.finish();
                            } else if (event.choice === 'opt2') {
                                player.storage.ms_lanai_opt2 = true;
                                player.chooseTarget('请选择一名其他角色，将【婪爱】交给Ta', function (card, player, target) {
                                    return target !== player && !target.hasSkill('ms_lanai');
                                }).set('forced', true);
                            } else if (event.choice === 'opt3') {
                                player.storage.ms_lanai_unlimited = true;
                                // 【出牌锁】：告诉记录子技能，接下来打出的牌是选项三发起的，准备截获！
                                player.storage.ms_lanai_using = true;

                                player.chooseToUse('请展示并使用一张未被消耗过花色的牌', function (card, player, evt) {
                                    var s = get.suit(card, player);
                                    if (!s || s === 'none') return false;

                                    var used = player.storage.ms_lanai || [];
                                    if (used.includes(s)) return false;

                                    evt = evt || _status.event;
                                    evt.addCount = false;
                                    evt.noLimit = true;
                                    return lib.filter.filterCard(card, player, evt);
                                })
                                    .set('addCount', false)
                                    .set('noLimit', true)
                                    .set('norestore', true);
                            }

                            'step 2'
                            delete player.storage.ms_lanai_unlimited;

                            if (event.choice === 'opt2') {
                                if (result.bool && result.targets && result.targets.length) {
                                    var target = result.targets[0];
                                    player.removeSkill('ms_lanai');
                                    target.addSkill('ms_lanai');
                                    // 【核心修复】：把“本回合已使用过选项二”的黑名单标记，强行继承并写入新角色的内存！
                                    target.storage = target.storage || {};
                                    target.storage.ms_lanai_opt2 = true;
                                    game.log(player, '将技能', '#g【婪爱】', '交给了', target);
                                }
                            } else if (event.choice === 'opt3') {
                                // ==========================================
                                // 【时序修复】：花色已经由 ms_lanai_record 在 useCard1 提前秒记了！
                                // 这里仅仅作为兜底：如果玩家在出牌界面强行点击了“取消”，才销毁锁并惩罚扣血！
                                // ==========================================
                                if (!result.bool) {
                                    delete player.storage.ms_lanai_using;
                                    player.loseHp(1);
                                }
                            }
                        },
                        onremove: function (player) {
                            player.unmarkSkill('ms_lanai');
                            delete player.storage.ms_lanai;
                            delete player.storage.ms_lanai_opt2;
                            delete player.storage.ms_lanai_using;
                        },
                        subSkill: {
                            // ==========================================
                            // 【前置捕获核心】：抢在套娃连击触发之前，瞬间完成拉黑与显框！
                            // ==========================================
                            record: {
                                charlotte: true,
                                trigger: {
                                    player: "useCard1", // 绑定在卡牌刚刚离手、宣布使用的第一毫秒！
                                },
                                filter: function (event, player) {
                                    return player.storage.ms_lanai_using === true;
                                },
                                forced: true,
                                popup: false,
                                firstDo: true,
                                priority: 1000, // 给予 1000 的最高优先级，抢在任何效果结算之前干活！
                                content: function () {
                                    var suit = get.suit(trigger.card, player);
                                    if (suit && suit !== 'none') {
                                        if (!player.storage.ms_lanai) {
                                            player.storage.ms_lanai = [];
                                        }
                                        if (!player.storage.ms_lanai.includes(suit)) {
                                            player.storage.ms_lanai.push(suit);
                                        }
                                        // 1. 瞬间点亮右上角“婪”字方框！
                                        player.markSkill('ms_lanai');
                                        // 2. 暴力向全场同步 UI 文字！
                                        game.broadcastAll(function (p) {
                                            if (p.marks && p.marks.ms_lanai) {
                                                p.marks.ms_lanai.firstChild.innerHTML = "婪";
                                            }
                                        }, player);
                                    }
                                    // 成功抓取记录完毕，立刻关掉本次选项三的捕获锁
                                    delete player.storage.ms_lanai_using;
                                },
                                sub: true,
                                "_priority": 0,
                            },
                            clear: {
                                trigger: {
                                    global: ["phaseAfter", "phaseJieshuBegin"],
                                },
                                forced: true,
                                silent: true,
                                content: function (event, player) {
                                    delete player.storage.ms_lanai;
                                    delete player.storage.ms_lanai_opt2;
                                    delete player.storage.ms_lanai_unlimited;
                                    delete player.storage.ms_lanai_using;
                                    player.unmarkSkill('ms_lanai');
                                },
                                sub: true,
                            }
                        }
                    },



                    ms_qiming: {
                        audio: 2,
                        enable: 'phaseUse',
                        usable: 1, // 出牌阶段限一次
                        position: 'h',
                        filterCard: true, // 可以选择任意手牌
                        selectCard: [1, Infinity], // 至少1张，至多不限
                        filterTarget: function (card, player, target) {
                            return target !== player; // 只能是其他角色
                        },
                        check: function (card) {
                            // AI逻辑：倾向于把价值低的牌交出去，顺便自己摸新牌（类似制衡）
                            return 6 - get.value(card);
                        },
                        targetprompt: '交给',
                        content: function () {
                            "step 0"
                            // 记录交出去的卡牌数量
                            event.num = cards.length;
                            // 直接调用底层的给牌API，会自动处理动画和状态
                            player.give(cards, target);
                            "step 1"
                            // 摸等量的牌
                            player.draw(event.num);
                        },
                        ai: {
                            order: 6, // 出牌阶段有较高的使用优先级
                            result: {
                                target: function (player, target) {
                                    // 交给友方角色
                                    return get.attitude(player, target) > 0 ? 1 : 0;
                                }
                            }
                        }
                    },


                    //————————————————————————————————————伊吕波———————————————————————————————————



                    ms_gongpo: {
                        audio: 2,
                        mark: true,
                        marktext: "弓",
                        intro: {
                            name: "弓破 · 牌堆底可见牌",
                            content: function (storage, player) {
                                var num = Math.max(0, player.hp);
                                if (num === 0) return "当前无可查看的牌堆底牌";
                                var cards = get.bottomCards(num, true);
                                if (!cards || cards.length === 0) return "当前牌堆底无可见牌";
                                return "当前体力值：" + num + "<br><b>牌堆底可见牌：</b><br>" + cards.map(function (c) {
                                    return get.translation(c) + ' [' + get.translation(get.suit(c)) + get.number(c) + ']';
                                }).join("<br>");
                            }
                        },
                        trigger: {
                            player: "useCard1",
                            target: "useCardToTargeted"
                        },
                        // 【核心升级】：绑定临时破限修饰技！
                        group: ["ms_gongpo_mod"],
                        filter: function (event, player, name) {
                            var triggerName = name || event.triggername;
                            if (triggerName === 'useCardToTargeted') {
                                if (event.player === player) return false;
                            }

                            var evt = event;
                            while (evt) {
                                if (evt._gongpo_replaced === true) return false;
                                evt = evt.getParent ? evt.getParent() : evt.parent;
                            }

                            if (event.card) {
                                if (event.card._gongpo_replaced === true) return false;
                                if (event.card.cards && event.card.cards.length) {
                                    for (var i = 0; i < event.card.cards.length; i++) {
                                        if (event.card.cards[i]._gongpo_replaced === true) return false;
                                    }
                                }
                            }
                            if (event.cards && event.cards.length) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (event.cards[i]._gongpo_replaced === true) return false;
                                }
                            }

                            if (!event.card) return false;
                            var cardName = get.name(event.card);
                            if (cardName === 'shan' || cardName === 'wuxie') return false;
                            if (!event.targets || event.targets.length === 0) return false;

                            var num = Math.max(0, player.hp);
                            if (num === 0) return false;

                            var bottomCards = get.bottomCards(num, true);
                            if (!bottomCards || bottomCards.length === 0) return false;

                            return bottomCards.some(function (card) {
                                var cname = get.name(card);
                                return cname !== 'shan' && cname !== 'wuxie';
                            });
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger || _status.event.trigger;
                            event.triggerEvent = trigger;

                            // ==========================================
                            // 【核心修复 Bug1】：在 step 0 立即将旧牌类型保存到 event 上！
                            // 彻底杜绝下一页 step 1 出现 oldType is not defined！
                            // ==========================================
                            event.oldType = get.type(trigger.card);

                            var num = Math.max(0, player.hp);
                            var bottomCards = get.bottomCards(num, true);
                            if (!bottomCards || bottomCards.length === 0) {
                                event.finish();
                                return;
                            }

                            player.chooseButton(
                                ['【弓破】请选择牌堆底的一张牌，与【' + get.translation(trigger.card) + '】进行替换', bottomCards],
                                function (button) {
                                    var cname = get.name(button.link);
                                    if (cname === 'shan' || cname === 'wuxie') return 0;
                                    return get.value(button.link);
                                }
                            ).set('filterButton', function (button) {
                                var cname = get.name(button.link);
                                return cname !== 'shan' && cname !== 'wuxie';
                            });

                            'step 1'
                            var player = event.player || _status.event.player;
                            var trigger = event.triggerEvent;
                            // 【安全读取】：从 event 提取上一页存好的 oldType
                            var oldType = event.oldType;

                            if (!result.bool || !result.links || !result.links.length) {
                                event.finish();
                                return;
                            }

                            var selectedCard = result.links[0];
                            event.selectedCard = selectedCard;
                            var oldCards = trigger.cards && trigger.cards.length ? trigger.cards : [trigger.card];

                            // 物理置换
                            if (selectedCard.parentNode) {
                                for (var i = 0; i < oldCards.length; i++) {
                                    if (get.itemtype(oldCards[i]) === 'card') {
                                        selectedCard.parentNode.insertBefore(oldCards[i], selectedCard);
                                    }
                                }
                                selectedCard.remove();
                            } else if (ui.cardPile) {
                                for (var i = 0; i < oldCards.length; i++) {
                                    if (get.itemtype(oldCards[i]) === 'card') {
                                        ui.cardPile.appendChild(oldCards[i]);
                                    }
                                }
                            }

                            // 强行终止旧牌
                            var rootUseCard = trigger;
                            if (trigger.name !== 'useCard' && trigger.getParent) {
                                rootUseCard = trigger.getParent('useCard') || trigger.parent || trigger;
                            }
                            trigger.cancel();
                            if (rootUseCard && rootUseCard !== trigger) {
                                rootUseCard.cancel();
                                rootUseCard.cards = [];
                            }
                            trigger.cards = [];

                            game.log(player, '发动了', '#g【弓破】', '，用牌堆底的', selectedCard, '替换了旧牌');

                            var cardUser = trigger.player || player;
                            event.cardUser = cardUser;
                            var targets = trigger.targets ? trigger.targets.slice() : [];
                            var newType = get.type(selectedCard);

                            // ==========================================
                            // 【落实目标选择】：只要新旧有一个是非即时牌（equip/delay），无限制选人！
                            // ==========================================
                            if (newType === 'equip' || newType === 'delay' || oldType === 'equip' || oldType === 'delay') {
                                player.chooseTarget(
                                    '【弓破】请为替换后的【' + get.translation(selectedCard) + '】重新指定一名无距离及特权限制的目标',
                                    function (card, player, target) {
                                        return true; // 全场任意目标无条件随便选！
                                    },
                                    true
                                ).set('ai', function (target) {
                                    return get.effect(target, selectedCard, cardUser, player);
                                });
                            } else {
                                // 即时牌替换即时牌，沿用旧目标数组！
                                event.newTargets = targets.length ? targets : [cardUser];
                            }

                            'step 2'
                            var player = event.player || _status.event.player;
                            var cardUser = event.cardUser;
                            var selectedCard = event.selectedCard;
                            var targets = event.newTargets;

                            if (!targets) {
                                if (result.bool && result.targets && result.targets.length) {
                                    targets = result.targets;
                                } else {
                                    targets = [player];
                                }
                            }

                            selectedCard._gongpo_replaced = true;

                            // ==========================================
                            // 【核心绝杀 强制转换 Bug2】：
                            // 挂起临时破限修饰技！强行打通 targetEnabled！
                            // 确保把【酒】、【桃】、【无中】用在敌人头上一刻，引擎绝对不准剥夺目标！
                            // ==========================================
                            cardUser.storage.ms_gongpo_using = true;
                            cardUser.addSkill('ms_gongpo_mod');

                            var next = cardUser.useCard(selectedCard, targets, true, false);
                            if (next) {
                                next._gongpo_replaced = true;
                                next.noLimit = true;
                                next.addCount = false;
                            }

                            'step 3'
                            // 用完即毁，卸载修饰技
                            var cardUser = event.cardUser;
                            if (cardUser) {
                                delete cardUser.storage.ms_gongpo_using;
                                cardUser.removeSkill('ms_gongpo_mod');
                            }
                        }
                    },

                    // ==========================================
                    // 【破限修饰技】：与弓破配套，强行打通目标限制，保证“指哪打哪”！
                    // ==========================================
                    ms_gongpo_mod: {
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (player.storage.ms_gongpo_using) return true;
                            },
                            targetInRange: function (card, player, target) {
                                if (player.storage.ms_gongpo_using) return true;
                            }
                        },
                        sub: true
                    },

                    ms_qidao: {
                        audio: 2,
                        unique: true,
                        juexingji: true,
                        forced: true,
                        skillAnimation: true,
                        animationColor: "fire",
                        derivation: ["ms_jiangshen"],
                        trigger: {
                            player: "phaseZhunbeiBegin",
                        },
                        filter: function (event, player) {
                            if (player.storage.ms_qidao) return false;

                            var num = Math.max(0, player.hp);
                            if (num === 0) return false;

                            var bottomCards = get.bottomCards(num, true);
                            if (!bottomCards || bottomCards.length < num || bottomCards.length === 0) return false;

                            var firstName = get.name(bottomCards[0]);
                            return bottomCards.every(function (card) {
                                return get.name(card) === firstName;
                            });
                        },
                        // 同样废弃 async，用最纯净的 step 状态机，绝不给未知报错留任何死角
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            player.storage.ms_qidao = true;
                            player.awakenSkill('ms_qidao');
                            game.log(player, '成功觉醒了', '#g【祈蹈】');
                            player.recover(1);
                            'step 1'
                            var player = event.player || _status.event.player;
                            player.addSkill('ms_jiangshen');
                            game.log(player, '获得了技能', '#g【降身】');
                        }
                    },

                    ms_jiangshen: {
                        audio: 2,
                        // 【可见框配置】：头像右上角亮起“降”字方框，悬停查看本回合用过的花色
                        mark: true,
                        marktext: "降",
                        intro: {
                            name: "降身 · 本回合已消耗花色",
                            content: function (storage, player) {
                                var suits = player.storage.ms_jiangshen_suits || [];
                                if (suits.length === 0) return "本回合暂未通过【降身】消耗过花色";
                                var map = {
                                    spade: '<span style="color:black;font-weight:bold;">♠ 黑桃</span>',
                                    heart: '<span style="color:red;font-weight:bold;">♥ 红桃</span>',
                                    club: '<span style="color:black;font-weight:bold;">♣ 梅花</span>',
                                    diamond: '<span style="color:red;font-weight:bold;">♦ 方块</span>'
                                };
                                return "本回合已消耗：<br>" + suits.map(function (s) { return map[s] || s; }).join("<br>");
                            }
                        },
                        // 【三大触发时机】：准备阶段开始、结束阶段开始、或弓破替换出牌结算后
                        trigger: {
                            player: ["phaseZhunbeiBegin", "phaseJieshuBegin", "useCardAfter"]
                        },
                        group: ["ms_jiangshen_clear"],
                        filter: function (event, player, name) {
                            var triggerName = name || event.triggername;
                            // 如果是出牌后触发，严查必须是“弓破”替换打出的那张牌！
                            if (triggerName === 'useCardAfter') {
                                var isGongpo = event._gongpo_replaced || (event.card && event.card._gongpo_replaced);
                                if (!isGongpo && event.getParent) {
                                    var parent = event.getParent('useCard');
                                    if (parent && (parent._gongpo_replaced || (parent.card && parent.card._gongpo_replaced))) {
                                        isGongpo = true;
                                    }
                                }
                                if (!isGongpo) return false;
                            }

                            // 1. 检查体力值与牌堆底是否有可见牌
                            var num = Math.max(0, player.hp);
                            if (num === 0) return false;
                            var bottomCards = get.bottomCards(num, true);
                            if (!bottomCards || bottomCards.length === 0) return false;

                            // 2. 检查手牌中是否有“本回合未消耗过花色”的牌
                            var usedSuits = player.storage.ms_jiangshen_suits || [];
                            var handCards = player.getCards('h');
                            if (!handCards || handCards.length === 0) return false;

                            return handCards.some(function (card) {
                                var s = get.suit(card, player);
                                return s && s !== 'none' && !usedSuits.includes(s);
                            });
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var usedSuits = player.storage.ms_jiangshen_suits || [];
                            var handCards = player.getCards('h');

                            // 收集手牌中所有未消耗且合法的唯一花色
                            var availableSuits = [];
                            handCards.forEach(function (card) {
                                var s = get.suit(card, player);
                                if (s && s !== 'none' && !usedSuits.includes(s) && !availableSuits.includes(s)) {
                                    availableSuits.push(s);
                                }
                            });

                            if (availableSuits.length === 0) {
                                event.finish();
                                return;
                            }

                            var suitMap = {
                                spade: '黑桃 ♠',
                                heart: '红桃 ♥',
                                club: '梅花 ♣',
                                diamond: '方块 ♦'
                            };

                            var choices = availableSuits.map(function (s) {
                                return suitMap[s] || s;
                            });
                            choices.push('取消'); // 提供取消选项，不强迫发动

                            player.chooseControl(choices).set('prompt', '【降身】请选择一种未消耗过的花色，用该花色【所有手牌】替换“弓破”可见牌：');

                            'step 1'
                            var player = event.player || _status.event.player;
                            if (!result.control || result.control === '取消') {
                                event.finish();
                                return;
                            }

                            var suitMapRev = {
                                '黑桃 ♠': 'spade',
                                '红桃 ♥': 'heart',
                                '梅花 ♣': 'club',
                                '方块 ♦': 'diamond'
                            };
                            var chosenSuit = suitMapRev[result.control] || result.control;

                            // 1. 记入本回合黑名单并立即点亮右上角标记框
                            player.storage.ms_jiangshen_suits = player.storage.ms_jiangshen_suits || [];
                            if (!player.storage.ms_jiangshen_suits.includes(chosenSuit)) {
                                player.storage.ms_jiangshen_suits.push(chosenSuit);
                            }
                            player.markSkill('ms_jiangshen');
                            game.broadcastAll(function (p) {
                                if (p.marks && p.marks.ms_jiangshen) {
                                    p.marks.ms_jiangshen.firstChild.innerHTML = "降";
                                }
                            }, player);

                            // 2. 抓取该花色的所有手牌
                            var cardsToLose = player.getCards('h', function (card) {
                                return get.suit(card, player) === chosenSuit;
                            });

                            // 3. 抓取当前牌堆底可见牌
                            var num = Math.max(0, player.hp);
                            var bottomCards = get.bottomCards(num, true);

                            if (cardsToLose.length > 0 && bottomCards && bottomCards.length > 0) {
                                var suitMap = { spade: '黑桃 ♠', heart: '红桃 ♥', club: '梅花 ♣', diamond: '方块 ♦' };
                                game.log(player, '发动了', '#g【降身】', '，消耗了所有', '#y' + (suitMap[chosenSuit] || chosenSuit), '手牌与牌堆底置换');

                                event.bottomCards = bottomCards; // 存入事件，留给 step 2 获得

                                // ==========================================
                                // 【置换第一步】：先失去该花色所有手牌，放回牌堆底 (ui.cardPile)
                                // ==========================================
                                player.lose(cardsToLose, ui.cardPile);
                            } else {
                                event.finish();
                            }

                            'step 2'
                            var player = event.player || _status.event.player;
                            // ==========================================
                            // 【置换第二步】：等手牌平稳落入牌堆底后，再将原本可见的底牌收入手中！
                            // ==========================================
                            if (event.bottomCards && event.bottomCards.length > 0) {
                                player.gain(event.bottomCards, 'gain2'); // gain2 带酷炫飞入动画，且不触发普通摸牌事件
                            }
                        }
                    },

                    // 回合结束自动清空本回合消耗的花色与方框
                    ms_jiangshen_clear: {
                        trigger: {
                            global: "phaseAfter", // 在整个回合彻底结束后清理，严谨无误！
                        },
                        forced: true,
                        silent: true,
                        content: function (event, player) {
                            delete player.storage.ms_jiangshen_suits;
                            player.unmarkSkill('ms_jiangshen');
                        },
                        sub: true,
                    },


                    //————————————————————————————————————龙胆———————————————————————————————————

                    ms_zuoxiang: {
                        audio: 2,
                        forced: true,
                        mark: true,
                        marktext: "相",
                        intro: {
                            name: "着相 · 追加特权",
                            content: function (storage, player) {
                                if (player.storage.ms_zuoxiang_ready) {
                                    return "<b>已就绪：</b>本回合下一张被使用的即时牌（基本/普通锦囊），你可为其追加一名无限制目标";
                                }
                                return "当前未就绪（当目标为你的牌结算未对你造成伤害后激活）";
                            }
                        },
                        trigger: {
                            global: "useCardAfter"
                        },
                        // 【核心升级】：绑定了最新的回合结束重置技 ms_zuoxiang_clear！
                        group: ["ms_zuoxiang_dmg", "ms_zuoxiang_add", "ms_zuoxiang_clear"],
                        filter: function (event, player) {
                            return event.targets && event.targets.includes(player);
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger;

                            var tookDamage = trigger._zuoxiang_dmged_players && trigger._zuoxiang_dmged_players.includes(player);

                            if (tookDamage) {
                                game.log(player, '触发了', '#g【着相】', '：目标牌对你造成了伤害，获得此牌');
                                if (trigger.cards && trigger.cards.length) {
                                    var toGain = trigger.cards.filter(function (c) {
                                        return !get.owner(c) || (c.parentNode && (c.parentNode === ui.discardPile || c.parentNode === ui.ordering || c.parentNode.id === 'discardPile' || c.parentNode.id === 'ordering'));
                                    });
                                    if (toGain.length > 0) {
                                        player.gain(toGain, 'gain2');
                                    }
                                }
                            } else {
                                game.log(player, '触发了', '#g【着相】', '：目标牌未对你造成伤害，摸一张牌并就绪追加目标特权');
                                player.draw(1);
                                player.storage.ms_zuoxiang_ready = true;
                                player.markSkill('ms_zuoxiang');
                            }
                        }
                    },

                    // 【伤害监听子技能】：精确定位伤害，互不干扰
                    ms_zuoxiang_dmg: {
                        trigger: {
                            player: "damage"
                        },
                        forced: true,
                        silent: true,
                        priority: 1000,
                        content: function (event, trigger, player) {
                            var useEvt = trigger.getParent ? trigger.getParent('useCard') : trigger.parent;
                            if (useEvt) {
                                useEvt._zuoxiang_dmged_players = useEvt._zuoxiang_dmged_players || [];
                                if (!useEvt._zuoxiang_dmged_players.includes(player)) {
                                    useEvt._zuoxiang_dmged_players.push(player);
                                }
                            }
                        },
                        sub: true
                    },

                    // 【目标追加子技能】：直接选人，非即时牌直接作废，桃子过滤满血！
                    ms_zuoxiang_add: {
                        trigger: {
                            global: "useCard2"
                        },
                        direct: true,
                        filter: function (event, player) {
                            return player.storage.ms_zuoxiang_ready === true;
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger;

                            // 只要有牌打出，标记立刻在“本回合”内被核销消耗
                            delete player.storage.ms_zuoxiang_ready;
                            player.unmarkSkill('ms_zuoxiang');

                            var type = get.type(trigger.card);
                            if (type !== 'basic' && type !== 'trick') {
                                game.log(player, '【着相】追加特权因被使用的【' + get.translation(trigger.card) + '】非即时牌（基本/普通锦囊），此次Buff', '#r直接作废');
                                event.finish();
                                return;
                            }

                            game.log(player, '消耗了', '#g【着相】', '追加目标特权');

                            player.chooseTarget(
                                '【着相】你可以为' + get.translation(trigger.player) + '使用的【' + get.translation(trigger.card) + '】追加一名无距离/常规限制的目标',
                                function (card, player, target) {
                                    var trig = _status.event.triggerEvent;
                                    // 排除已经是该牌目标的角色
                                    if (trig.targets && trig.targets.includes(target)) return false;

                                    // ==========================================
                                    // 【核心改进1 落实您的铁律】：若使用的是【桃】，绝对不可追加给满血（未受伤）角色！
                                    // ==========================================
                                    if (get.name(trig.card) === 'tao' && !target.isDamaged()) return false;

                                    return true;
                                }
                            ).set('triggerEvent', trigger).set('ai', function (target) {
                                var trig = _status.event.triggerEvent;
                                return get.effect(target, trig.card, trig.player, player);
                            });

                            'step 1'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger;

                            if (result.bool && result.targets && result.targets.length) {
                                var newTarget = result.targets[0];
                                trigger.targets = trigger.targets || [];
                                trigger.targets.push(newTarget);
                                game.log(player, '发动', '#g【着相】', '，为【' + get.translation(trigger.card) + '】追加了目标', newTarget);
                            }
                        },
                        sub: true
                    },

                    // ==========================================
                    // 【核心改进2 回合重置技】：确保特权仅限“本回合”有效！
                    // ==========================================
                    ms_zuoxiang_clear: {
                        trigger: {
                            global: ["phaseAfter", "phaseJieshuBegin"]
                        },
                        forced: true,
                        silent: true,
                        content: function (event, player) {
                            if (player.storage.ms_zuoxiang_ready) {
                                game.log(player, '的【着相】追加特权因回合结束而', '#y过期失效');
                                delete player.storage.ms_zuoxiang_ready;
                                player.unmarkSkill('ms_zuoxiang');
                            }
                        },
                        sub: true
                    },

                    ms_zhiming: {
                        audio: 2,
                        enable: "phaseUse",
                        filter: function (event, player) {
                            if (player.storage.ms_zhiming_fail) return false;
                            if (player.countCards('ej') === 0) return false;
                            return game.hasPlayer(function (current) {
                                return current.countCards('he') > 0;
                            });
                        },
                        filterTarget: function (card, player, target) {
                            return target.countCards('he') > 0;
                        },
                        group: ["ms_zhiming_mod", "ms_zhiming_clear"],
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var target = event.target || (event.targets ? event.targets[0] : null);
                            event.targetPlayer = target;

                            if (!target) {
                                event.finish();
                                return;
                            }

                            // 弃置目标角色一张牌
                            if (target === player) {
                                player.chooseToDiscard(1, 'he', true, '【知命】请弃置你的一张牌');
                            } else {
                                player.discardPlayerCard(target, 'he', true, '【知命】请弃置' + get.translation(target) + '的一张牌');
                            }

                            'step 1'
                            var player = event.player || _status.event.player;
                            var target = event.targetPlayer;

                            var num = player.countCards('ej');
                            if (num <= 0) {
                                game.log(player, '场上装备区和判定区总牌数为0，无法继续展示牌堆顶');
                                event.finish();
                                return;
                            }

                            var cards = get.cards(num);
                            if (!cards || cards.length === 0) {
                                event.finish();
                                return;
                            }
                            event.topCards = cards;

                            for (var i = cards.length - 1; i >= 0; i--) {
                                if (cards[i].fix) cards[i].fix();
                                ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
                            }

                            game.log(target, '观看并展示了牌堆顶的', num, '张牌：', cards);

                            // 严格过滤合法的“可对你使用”卡牌
                            var usableCards = cards.filter(function (card) {
                                var cname = get.name(card);
                                var type = get.type(card);

                                if (cname === 'shan' || cname === 'wuxie') return false;
                                if (cname === 'tao' && !player.isDamaged()) return false;
                                if (type === 'delay' && player.hasJudge(cname)) return false;

                                return true;
                            });

                            if (usableCards.length === 0) {
                                game.log(player, '展示的牌中无任何能对你使用的牌，【知命】', '#r本回合失效');
                                player.storage.ms_zhiming_fail = true;
                                // 【绝不弃牌】：因为上面已经通过 insertBefore 放回了牌堆顶，
                                // 这里直接结束事件，展示过但不可用的牌自然100%保留在牌堆顶！
                                event.finish();
                                return;
                            }

                            // 把完整的牌堆顶数组 cards 传给界面，不可用的闪、无懈等呈灰色不可选态！
                            target.chooseButton(
                                ['【知命】请选择其中一张可用牌，对' + get.translation(player) + '强制使用', cards],
                                true
                            ).set('usableCards', usableCards).set('filterButton', function (button) {
                                return _status.event.usableCards.includes(button.link);
                            }).set('ai', function (button) {
                                return get.effect(player, button.link, target, target);
                            });

                            'step 2'
                            var player = event.player || _status.event.player;
                            var target = event.targetPlayer;

                            if (result.bool && result.links && result.links.length) {
                                var selectedCard = result.links[0];

                                game.log(target, '选择使用', selectedCard, '指定', player, '为目标');

                                target.storage.ms_zhiming_using = true;
                                target.addSkill('ms_zhiming_mod');

                                var next = target.useCard(selectedCard, [player], true, false);
                                if (next) {
                                    next.noLimit = true;
                                    next.addCount = false;
                                }
                            }

                            'step 3'
                            var target = event.targetPlayer;
                            if (target) {
                                delete target.storage.ms_zhiming_using;
                                target.removeSkill('ms_zhiming_mod');
                            }
                        }
                    },

                    // 【破限修饰技】：打破自杀和距离限制
                    ms_zhiming_mod: {
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (player.storage.ms_zhiming_using) return true;
                            },
                            targetInRange: function (card, player, target) {
                                if (player.storage.ms_zhiming_using) return true;
                            }
                        },
                        sub: true
                    },

                    // 【回合重置技】：回合结束时清空失效烙印
                    ms_zhiming_clear: {
                        trigger: {
                            global: ["phaseAfter", "phaseJieshuBegin"]
                        },
                        forced: true,
                        silent: true,
                        content: function (event, player) {
                            delete player.storage.ms_zhiming_fail;
                        },
                        sub: true
                    },


                    //————————————————————————————————————利西亚——————————————————————————————————

                    ms_binhun: {
                        audio: 2,
                        forced: true,
                        mark: true,
                        marktext: "昏",
                        intro: {
                            content: "锁定技，你使用的牌结算后，你必须弃置一种花色的所有手牌。"
                        },
                        trigger: {
                            player: "useCardAfter"
                        },
                        filter: function (event, player) {
                            return player.countCards('h') > 0;
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var handCards = player.getCards('h');

                            var suits = [];
                            var suitMap = { spade: '黑桃 ♠', heart: '红桃 ♥', club: '梅花 ♣', diamond: '方块 ♦' };

                            // 收集手牌中所有现存的花色
                            handCards.forEach(function (card) {
                                var s = get.suit(card, player);
                                if (s && s !== 'none' && !suits.includes(s)) {
                                    suits.push(s);
                                }
                            });

                            if (suits.length === 0) {
                                event.finish();
                                return;
                            }

                            // 【智能体验优化】：若手牌仅剩 1 种花色，不弹窗打扰，直接自动选择弃置！
                            if (suits.length === 1) {
                                event.autoSuit = suits[0];
                                return;
                            }

                            var choices = suits.map(function (s) { return suitMap[s] || s; });
                            event.suitMapRev = {
                                '黑桃 ♠': 'spade',
                                '红桃 ♥': 'heart',
                                '梅花 ♣': 'club',
                                '方块 ♦': 'diamond'
                            };

                            player.chooseControl(choices).set('prompt', '【秉昏】请选择弃置一种花色的所有手牌');

                            'step 1'
                            var player = event.player || _status.event.player;
                            var chosenSuit = event.autoSuit;
                            if (!chosenSuit && result.control) {
                                chosenSuit = event.suitMapRev[result.control] || result.control;
                            }

                            if (chosenSuit) {
                                var toDiscard = player.getCards('h', function (card) {
                                    return get.suit(card, player) === chosenSuit;
                                });
                                if (toDiscard.length > 0) {
                                    var suitMap = { spade: '黑桃 ♠', heart: '红桃 ♥', club: '梅花 ♣', diamond: '方块 ♦' };
                                    game.log(player, '触发了锁定技', '#g【秉昏】', '，弃置了所有', '#y' + (suitMap[chosenSuit] || chosenSuit), '手牌');
                                    player.discard(toDiscard);
                                }
                            }
                        }
                    },

                    ms_tuien: {
                        audio: 2,
                        mark: true,
                        marktext: "恩",
                        intro: {
                            name: "推恩 · 剩余可用次数",
                            content: function (storage, player) {
                                var maxCount = Math.max(0, player.hp);
                                var used = player.storage.ms_tuien_used || 0;
                                var left = Math.max(0, maxCount - used);
                                return "当前体力上限次数：" + maxCount + "<br><b>本阶段剩余次数：</b><span style='color:red;font-weight:bold;'>" + left + "</span> 次<br>（每次使用牌都会重新刷新至满次数）";
                            }
                        },
                        // 并列绑定：使用牌刷新技 + 失去手牌触发技 + 回合重置技
                        group: ["ms_tuien_refresh", "ms_tuien_lose", "ms_tuien_clear"],
                        sub: true
                    },

                    // 【使用牌刷新技】：只要出牌，立即刷新使用次数至 0
                    ms_tuien_refresh: {
                        trigger: {
                            player: ["useCard", "useCard1"]
                        },
                        forced: true,
                        silent: true,
                        priority: 100,
                        content: function (event, trigger, player) {
                            player.storage.ms_tuien_used = 0;
                            player.markSkill('ms_tuien');
                        },
                        sub: true
                    },

                    // 【失去手牌触发技】：夺取他人一牌，并将失去的牌交给他
                    ms_tuien_lose: {
                        trigger: {
                            player: "loseAfter"
                        },
                        filter: function (event, player) {
                            if (player.storage.ms_tuien_fail) return false;
                            var maxCount = Math.max(0, player.hp);
                            if ((player.storage.ms_tuien_used || 0) >= maxCount) return false;

                            // 【核心绝杀 防递归】：若是自身“把失去的牌交给目标”引起的失去/获得事件，绝对死锁不触发！
                            var evt = event;
                            while (evt) {
                                if (evt._ms_tuien_giving === true) return false;
                                evt = evt.getParent ? evt.getParent() : evt.parent;
                            }

                            // 验证失去的物理卡牌中，必须包含从【手牌区 (hs)】失去的牌
                            var hs = [];
                            if (event.getl) {
                                var info = event.getl(player);
                                if (info && info.hs && info.hs.length) hs = info.hs;
                            } else if (event.hs && event.hs.length) {
                                hs = event.hs;
                            }
                            if (!hs || hs.length === 0) return false;

                            // 场上必须有除了你之外、至少有1张牌的其它角色
                            return game.hasPlayer(function (current) {
                                return current !== player && current.countCards('he') > 0;
                            });
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger;

                            // 抓取并保存本次失去事件中的“手牌”
                            var hs = [];
                            if (trigger.getl) {
                                var info = trigger.getl(player);
                                if (info && info.hs && info.hs.length) hs = info.hs.slice();
                            } else if (trigger.hs && trigger.hs.length) {
                                hs = trigger.hs.slice();
                            }
                            event.lostHandCards = hs;

                            // 计入次数并点亮图标
                            player.storage.ms_tuien_used = (player.storage.ms_tuien_used || 0) + 1;
                            player.markSkill('ms_tuien');

                            game.log(player, '发动了', '#g【推恩】');

                            // 选择目标角色，获得其一张牌
                            player.chooseTarget(
                                '【推恩】请选择一名其它角色，获得其一张牌（随后你将你失去的手牌交给他）',
                                function (card, player, target) {
                                    return target !== player && target.countCards('he') > 0;
                                }
                            ).set('ai', function (target) {
                                // AI策略：优先挑敌人的牌，再把废牌/弃牌塞给敌人
                                return -get.attitude(_status.event.player, target);
                            });

                            'step 1'
                            var player = event.player || _status.event.player;
                            if (result.bool && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                event.targetPlayer = target;
                                // 获得目标一张牌
                                player.gainPlayerCard(target, 'he', true, '【推恩】选择获得' + get.translation(target) + '的一张牌');
                            } else {
                                event.finish();
                            }

                            'step 2'
                            var player = event.player || _status.event.player;
                            var target = event.targetPlayer;
                            var hs = event.lostHandCards || [];

                            if (target && target.isAlive() && hs.length > 0) {
                                // 严谨过滤：仅将目前还处于弃牌堆或结算区的、你刚才真正失去的手牌交给他
                                var toGive = hs.filter(function (c) {
                                    return !get.owner(c) || (c.parentNode && (c.parentNode === ui.discardPile || c.parentNode === ui.ordering || c.parentNode.id === 'discardPile' || c.parentNode.id === 'ordering'));
                                });

                                if (toGive.length > 0) {
                                    game.log(player, '将失去的手牌', toGive, '交给了', target);
                                    // 使用 gain2 直接从弃牌堆/桌面上飞入目标手牌，并注入防递归烙印！
                                    var next = target.gain(toGive, 'gain2');
                                    if (next) next._ms_tuien_giving = true;
                                }
                            }
                        },
                        sub: true
                    },

                    // 【回合重置技】：回合或阶段结束清理计数
                    ms_tuien_clear: {
                        trigger: {
                            global: ["phaseAfter", "roundStart"]
                        },
                        forced: true,
                        silent: true,
                        content: function (event, player) {
                            player.storage.ms_tuien_used = 0;
                            player.unmarkSkill('ms_tuien');
                        },
                        sub: true
                    },

                    ms_luangang: {
                        audio: 2,
                        forced: true,
                        mark: true,
                        marktext: "纲",
                        intro: {
                            content: "锁定技。当你“不因本技能”执行使用【杀】、获得他人一牌、摸且仅摸一牌、弃置且仅弃置任意角色一牌这四项之一时，你必须立刻选择并执行其他三项合法操作之一。"
                        },
                        trigger: {
                            player: ["useCard", "gainAfter", "drawAfter", "discardAfter", "discardPlayerCardAfter"]
                        },
                        filter: function (event, player, name) {
                            var evt = event;
                            while (evt) {
                                if (evt._luangang_caused === true) return false;
                                evt = evt.getParent ? evt.getParent() : evt.parent;
                            }

                            var triggerName = name || event.triggername || event.name;
                            var actionId = 0;

                            // 动作 1：使用一张【杀】
                            if (triggerName === 'useCard') {
                                if (event.card && get.name(event.card) === 'sha') actionId = 1;
                            }
                            // 动作 2：获得其它角色一张牌
                            else if (triggerName === 'gainAfter') {
                                var isFromOther = false;
                                if (event.source && event.source !== player) isFromOther = true;
                                else if (event.from && event.from !== player) isFromOther = true;
                                else if (event.getParent && event.getParent().name === 'gainPlayerCard' && event.getParent().target && event.getParent().target !== player) isFromOther = true;
                                if (isFromOther) actionId = 2;
                            }
                            // 动作 3：严格死守“摸，且仅摸 1 张牌”
                            else if (triggerName === 'drawAfter') {
                                var drawCount = 0;
                                if (typeof event.num === 'number') drawCount = event.num;
                                else if (event.cards && event.cards.length) drawCount = event.cards.length;
                                if (drawCount === 1) actionId = 3;
                            }
                            // ==========================================
                            // 【核心绝杀 修复弃牌Bug】：严格死守“弃置，且仅弃置 1 张牌”！
                            // ==========================================
                            else if (triggerName === 'discardAfter' || triggerName === 'discardPlayerCardAfter') {
                                var discardCount = 0;
                                if (event.cards && event.cards.length) discardCount = event.cards.length;
                                else if (typeof event.num === 'number') discardCount = event.num;

                                // 多一张不行，少一张不行！例如弃2张牌绝对不触发！
                                if (discardCount === 1) actionId = 4;
                            }

                            if (actionId === 0) return false;

                            // 将 actionId 记录在真实的触发事件身上
                            event._triggeredActionId = actionId;

                            // 验证其余选项是否有合法可执行的
                            var hasShaCard = player.hasCard(function (c) {
                                return get.name(c) === 'sha' || (c.viewAs && c.viewAs === 'sha');
                            }, 'hs');
                            var hasShaTarget = game.hasPlayer(function (current) {
                                return player.canUse('sha', current);
                            });

                            var canAction1 = (actionId !== 1) && hasShaCard && hasShaTarget;
                            var canAction2 = (actionId !== 2) && game.hasPlayer(function (current) {
                                return current !== player && current.countCards('he') > 0;
                            });
                            var canAction3 = (actionId !== 3);
                            var canAction4 = (actionId !== 4) && game.hasPlayer(function (current) {
                                return current.countCards('he') > 0;
                            });

                            return canAction1 || canAction2 || canAction3 || canAction4;
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;

                            // ==========================================
                            // 【核心绝杀 修复互斥Bug】：
                            // 必须通过 _trigger 找到引发触发的真实源头事件，从中提取 actionId！
                            // 绝对不能直接从当前 event 上提取，因为当前 event 是新生成的技能事件！
                            // ==========================================
                            var trigger = event._trigger || event.trigger || _status.event._trigger || _status.event.trigger;
                            var actionId = trigger ? trigger._triggeredActionId : 0;

                            // 防御性容错：万一拿不到，用源头事件重新精准计算一次！
                            if (!actionId && trigger) {
                                var tName = trigger.triggername || trigger.name;
                                if (tName === 'useCard' && trigger.card && get.name(trigger.card) === 'sha') actionId = 1;
                                else if (tName === 'gainAfter') actionId = 2;
                                else if (tName === 'drawAfter') {
                                    var dc = (typeof trigger.num === 'number') ? trigger.num : (trigger.cards ? trigger.cards.length : 0);
                                    if (dc === 1) actionId = 3;
                                }
                                else if (tName === 'discardAfter' || tName === 'discardPlayerCardAfter') {
                                    var disc = (trigger.cards && trigger.cards.length) ? trigger.cards.length : (typeof trigger.num === 'number' ? trigger.num : 0);
                                    if (disc === 1) actionId = 4;
                                }
                            }

                            _status.event._luangang_caused = true;

                            var hasShaCard = player.hasCard(function (c) {
                                return get.name(c) === 'sha' || (c.viewAs && c.viewAs === 'sha');
                            }, 'hs');
                            var hasShaTarget = game.hasPlayer(function (current) {
                                return player.canUse('sha', current);
                            });

                            // ==========================================
                            // 【绝对互斥校验】：此时 actionId 绝对是真实的触发编号！
                            // ==========================================
                            var canAction1 = (actionId !== 1) && hasShaCard && hasShaTarget;
                            var canAction2 = (actionId !== 2) && game.hasPlayer(function (current) {
                                return current !== player && current.countCards('he') > 0;
                            });
                            var canAction3 = (actionId !== 3);
                            var canAction4 = (actionId !== 4) && game.hasPlayer(function (current) {
                                return current.countCards('he') > 0;
                            });

                            var choices = [];
                            var choiceMap = {};
                            if (canAction1) { choices.push('使用一张【杀】'); choiceMap['使用一张【杀】'] = 1; }
                            if (canAction2) { choices.push('获得他人一牌'); choiceMap['获得他人一牌'] = 2; }
                            if (canAction3) { choices.push('摸一张牌'); choiceMap['摸一张牌'] = 3; }
                            if (canAction4) { choices.push('弃置任意角色一牌'); choiceMap['弃置任意角色一牌'] = 4; }

                            if (choices.length === 0) {
                                event.finish();
                                return;
                            }

                            var actionNames = {
                                1: "使用【杀】",
                                2: "获得他人一牌",
                                3: "摸一张牌",
                                4: "弃置角色一牌"
                            };
                            var triggeredName = actionNames[actionId] || "操作";

                            player.chooseControl(choices).set('prompt', '【乱纲】因触发了[' + triggeredName + ']，请选择执行其他另一项合法操作');
                            event.choiceMap = choiceMap;

                            'step 1'
                            var player = event.player || _status.event.player;
                            var chosen = event.choiceMap[result.control];
                            event.chosenAction = chosen;

                            game.log(player, '触发了锁定技', '#g【乱纲】', '，执行操作：', '#y' + result.control);

                            if (chosen === 1) {
                                var next = player.chooseToUse(function (card, player, event) {
                                    return get.name(card) === 'sha';
                                }, '【乱纲】请使用一张【杀】').set('addCount', false).set('noLimit', true);
                                if (next) next._luangang_caused = true;
                            }
                            else if (chosen === 2) {
                                player.chooseTarget('【乱纲】请选择一名其它角色，获得其一张牌', function (card, player, target) {
                                    return target !== player && target.countCards('he') > 0;
                                }).set('ai', function (target) {
                                    return -get.attitude(_status.event.player, target);
                                });
                            }
                            else if (chosen === 3) {
                                var next = player.draw(1);
                                if (next) next._luangang_caused = true;
                                event.finish();
                            }
                            else if (chosen === 4) {
                                player.chooseTarget('【乱纲】请选择一名角色，弃置其一张牌', function (card, player, target) {
                                    return target.countCards('he') > 0;
                                }).set('ai', function (target) {
                                    return -get.attitude(_status.event.player, target);
                                });
                            }

                            'step 2'
                            var player = event.player || _status.event.player;
                            var chosen = event.chosenAction;

                            if (chosen === 2) {
                                if (result.bool && result.targets && result.targets.length) {
                                    var target = result.targets[0];
                                    var next = player.gainPlayerCard(target, 'he', true, '【乱纲】获得' + get.translation(target) + '的一张牌');
                                    if (next) next._luangang_caused = true;
                                }
                            } else if (chosen === 4) {
                                if (result.bool && result.targets && result.targets.length) {
                                    var target = result.targets[0];
                                    if (target === player) {
                                        var next = player.chooseToDiscard(1, 'he', true, '【乱纲】请弃置你的一张牌');
                                        if (next) next._luangang_caused = true;
                                    } else {
                                        var next = player.discardPlayerCard(target, 'he', true, '【乱纲】弃置' + get.translation(target) + '的一张牌');
                                        if (next) next._luangang_caused = true;
                                    }
                                }
                            }
                        }
                    },



                    //—————————————————————————————————————灰流—————————————————————————————————————————————
                    ms_dianlu: {
                        audio: 2,
                        enable: "chooseToUse", // 正统主动印牌：出牌阶段点击亮起
                        mark: true,
                        marktext: "路",
                        intro: {
                            name: "点路 · 上一张出牌状态",
                            content: function (storage, player) {
                                var turnCards = _status.ms_turn_used_cards || [];
                                if (turnCards.length === 0) return "本回合暂无已使用过的卡牌记录";
                                var last = turnCards[turnCards.length - 1];
                                var statusStr = last.isConverted ? "<span style='color:red;font-weight:bold;'>转化牌（当前不可印牌）</span>" : "<span style='color:green;font-weight:bold;'>非转化牌（当前已就绪可印牌）</span>";
                                return "<b>上一张使用的牌：</b>【" + get.translation(last.card) + "】<br><b>类型：</b>" + statusStr;
                            }
                        },
                        group: ["ms_dianlu_monitor", "ms_dianlu_effect", "ms_dianlu_clear"],

                        filter: function (event, player) {
                            // ==========================================
                            // 【核心绝杀 修复武器无视Bug】：
                            // 深度重写官方借刀杀人目标校验，查验 _status.event.skill！
                            // 确保你在界面选人的那一刻，绝对不查武器！
                            // ==========================================
                            if (!lib.card.jiedao._ms_dianlu_hooked) {
                                lib.card.jiedao._ms_dianlu_hooked = true;
                                var oldFilter = lib.card.jiedao.filterTarget;
                                lib.card.jiedao.filterTarget = function (card, player, target) {
                                    var isDianlu = false;
                                    if (_status.event && (_status.event.skill === 'ms_dianlu' || (_status.event.getParent && _status.event.getParent().skill === 'ms_dianlu'))) isDianlu = true;
                                    if (typeof ui !== 'undefined' && ui.selected && ui.selected.skills && ui.selected.skills.includes('ms_dianlu')) isDianlu = true;
                                    if (card && (card.skill === 'ms_dianlu' || card._ms_dianlu)) isDianlu = true;

                                    if (isDianlu) {
                                        if (typeof ui !== 'undefined' && ui.selected && ui.selected.targets.length === 0) {
                                            // 第一目标（借刀人）：只要不是自己，且能在攻击范围内对别人出杀即可！无须任何武器！
                                            return target !== player && game.hasPlayer(function (current) {
                                                return target.canUse('sha', current);
                                            });
                                        } else if (typeof ui !== 'undefined' && ui.selected && ui.selected.targets.length > 0) {
                                            // 第二目标：第一目标能出杀打到的人
                                            return ui.selected.targets[0].canUse('sha', target);
                                        }
                                    }
                                    return oldFilter.apply(this, arguments);
                                };
                            }

                            if (player.countCards('he') === 0) return false;
                            var turnCards = _status.ms_turn_used_cards || [];
                            if (turnCards.length === 0) return false;
                            var lastInfo = turnCards[turnCards.length - 1];
                            return lastInfo && lastInfo.isConverted === false;
                        },
                        filterCard: function (card, player) {
                            return true;
                        },
                        position: "he",
                        viewAs: {
                            name: "jiedao"
                        },
                        prompt: "【点路】你可以将一张牌印为【借刀杀人】使用（不要求目标有武器）",
                        check: function (card) {
                            return 7 - get.value(card);
                        },
                        ai: {
                            order: 8,
                            result: {
                                player: 1,
                                target: function (player, target, card) {
                                    if (!target.mayHaveSha(player, 'use')) return -0.5;
                                    return get.effect(target, { name: 'jiedao' }, player, player);
                                }
                            }
                        }
                    },

                    // 连坐惩罚技：对方不出杀则上一张转化牌目标集体群殴！
                    ms_dianlu_effect: {
                        trigger: {
                            global: "useCardAfter"
                        },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (!event.card || get.name(event.card) !== 'jiedao') return false;
                            return event.skill === 'ms_dianlu' || (event.card && (event.card.skill === 'ms_dianlu' || event.card._ms_dianlu));
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger;
                            var target1 = trigger.targets ? trigger.targets[0] : null;
                            if (!target1 || !target1.isAlive()) {
                                event.finish();
                                return;
                            }

                            var didUseSha = false;
                            var history = target1.getHistory('useCard', function (evt) {
                                return get.name(evt.card) === 'sha' && evt.getParent('useCard') === trigger;
                            });
                            if (history && history.length > 0) didUseSha = true;

                            if (didUseSha) {
                                event.finish();
                                return;
                            }

                            var turnCards = _status.ms_turn_used_cards || [];
                            var prevConvertedInfo = null;
                            for (var i = turnCards.length - 1; i >= 0; i--) {
                                var info = turnCards[i];
                                if (info.evt === trigger || info.card === trigger.card || (info.card && info.card.skill === 'ms_dianlu')) continue;
                                if (info.isConverted === true) {
                                    prevConvertedInfo = info;
                                    break;
                                }
                            }

                            if (prevConvertedInfo && prevConvertedInfo.targets && prevConvertedInfo.targets.length > 0) {
                                var dmgSources = prevConvertedInfo.targets.filter(function (p) { return p && p.isAlive(); });
                                if (dmgSources.length > 0) {
                                    game.log(player, '发动了', '#g【点路】', '连坐效果，令上一张转化牌【' + get.translation(prevConvertedInfo.card) + '】的目标角色', dmgSources, '依次对', target1, '造成1点伤害！');
                                    event.dmgSources = dmgSources;
                                    event.dmgIndex = 0;
                                    event.victim = target1;
                                } else {
                                    game.log(player, '上一张转化牌的目标角色均已不在场，【点路】伤害无法执行');
                                    event.finish();
                                }
                            } else {
                                game.log(player, '在此之前本回合无其他已使用的转化牌，【点路】伤害无法执行');
                                event.finish();
                            }

                            'step 1'
                            if (event.dmgSources && event.dmgIndex < event.dmgSources.length && event.victim && event.victim.isAlive()) {
                                var src = event.dmgSources[event.dmgIndex];
                                if (src && src.isAlive()) {
                                    game.log(src, '对', event.victim, '造成了 1 点伤害');
                                    event.victim.damage(1, src);
                                }
                                event.dmgIndex++;
                                event.redo();
                            }
                        },
                        sub: true
                    },

                    ms_dianlu_monitor: {
                        trigger: {
                            global: "useCard1"
                        },
                        forced: true,
                        silent: true,
                        priority: 10000,
                        content: function (event, trigger, player) {
                            _status.ms_turn_used_cards = _status.ms_turn_used_cards || [];
                            var isConverted = false;
                            if (trigger.skill || (trigger.card && trigger.card.skill)) {
                                isConverted = true;
                            } else if (trigger.card && trigger.card.isCard === true && trigger.card.cards && trigger.card.cards.length > 0) {
                                if (trigger.card.cards.length !== 1) {
                                    isConverted = true;
                                } else {
                                    var phys = trigger.card.cards[0];
                                    if (phys && get.name(trigger.card, false) !== get.name(phys, false)) isConverted = true;
                                    else if (phys && get.suit(trigger.card, false) !== get.suit(phys, false)) isConverted = true;
                                }
                            }
                            var already = _status.ms_turn_used_cards.some(function (info) { return info.evt === trigger; });
                            if (!already) {
                                _status.ms_turn_used_cards.push({
                                    card: trigger.card,
                                    player: trigger.player,
                                    targets: trigger.targets ? trigger.targets.slice() : [],
                                    isConverted: isConverted,
                                    evt: trigger
                                });
                            }
                        },
                        sub: true
                    },

                    ms_dianlu_clear: {
                        trigger: {
                            global: ["phaseAfter", "roundStart", "roundStart1"]
                        },
                        forced: true,
                        silent: true,
                        priority: 10000,
                        content: function (event, trigger, player) {
                            _status.ms_turn_used_cards = [];
                        },
                        sub: true
                    },

                    ms_fengliu: {
                        audio: 2,
                        mark: true,
                        marktext: "流",
                        intro: {
                            content: "当目标包含你的非转化牌结算完成后，你可以将一张手牌或装备牌当【桃园结义】使用。"
                        },
                        trigger: {
                            global: "useCardAfter"
                        },
                        // 绑定专职印牌子技能！
                        group: ["ms_fengliu_viewas"],
                        filter: function (event, player) {
                            if (player.countCards('he') === 0) return false;

                            // 1. 排除转化牌：有 skill 属性、或由多张牌合成、或卡名与实卡不一致，统统属于转化牌
                            var isConverted = false;
                            if (event.skill || (event.card && event.card.skill)) {
                                isConverted = true;
                            } else if (event.card && event.card.isCard === true && event.card.cards && event.card.cards.length > 0) {
                                if (event.card.cards.length !== 1) {
                                    isConverted = true;
                                } else {
                                    var phys = event.card.cards[0];
                                    if (phys && get.name(event.card, false) !== get.name(phys, false)) isConverted = true;
                                    else if (phys && get.suit(event.card, false) !== get.suit(phys, false)) isConverted = true;
                                }
                            } else if (event.card && (event.card._ms_dianlu || event.card._ms_fengliu)) {
                                isConverted = true;
                            }
                            if (isConverted) return false;

                            // 2. 确保卡牌结算的目标中包含你（包括自己对自己的真酒、真无中，或回合外被打）
                            var allTargets = event.all_targets || event.targets || (event.target ? [event.target] : []);
                            var isTargeted = false;
                            if (allTargets && allTargets.length > 0) {
                                for (var i = 0; i < allTargets.length; i++) {
                                    if (allTargets[i] === player || (allTargets[i].playerid && allTargets[i].playerid === player.playerid)) {
                                        isTargeted = true;
                                        break;
                                    }
                                }
                            }
                            if (!isTargeted && event.player === player && event.card) {
                                var info = get.info(event.card);
                                if (info && (info.toself || info.target === 'self')) {
                                    isTargeted = true;
                                }
                            }
                            return isTargeted;
                        },
                        content: function () {
                            'step 0'

                            var next = player.chooseToUse();
                            next.backup('ms_fengliu_viewas');
                            next.set('addCount', false);
                            next.set('noLimit', true);

                            'step 1'
                            if (result.bool) {
                                game.log(player, '发动了', '#g【风流】', '，成功将牌印为【桃园结义】并使用');
                            }
                        }
                    },

                    ms_fengliu_viewas: {
                        audio: 2,
                        filterCard: function (card, player) {
                            return true; // 允许选择任意手牌或装备牌进行转化
                        },
                        position: "he",
                        viewAs: {
                            name: "taoyuan",
                        },
                        prompt: "【风流】请选择一张手牌或装备牌，将其当【桃园结义】使用",
                        check: function (card) {
                            return 7 - get.value(card);
                        },
                        ai: {
                            order: 8,
                            result: {
                                player: 1,
                            }
                        },
                        sub: true
                    },


                    //———————————————————————————————————榊原拓———————————————————————————————————————————

                    ms_gouzao: {
                        audio: 2,
                        mark: true,
                        marktext: "构",
                        intro: {
                            name: "构造 · 全局字典区",
                            content: function (storage, player) {
                                var cards = player.storage.ms_gouzao_cards || [];
                                if (cards.length === 0) return "当前武将牌上无扣置的锦囊与基本牌";
                                var str = "<b>武将牌上扣置的字典牌：</b><br>";
                                str += cards.map(function (c) {
                                    return "【" + get.translation(c) + "】";
                                }).join("、");

                                var ledger = _status.ms_gouzao_ledger || [];
                                if (ledger.length > 0) {
                                    str += "<br><br><b>🔥 本轮生效中的【全局游戏规则】：</b><br>";
                                    ledger.forEach(function (r) {
                                        str += "• <b>【" + get.translation(r.cname) + "】</b>：";
                                        var details = [];
                                        if (r.rule.targetRule) details.push("目标改为[" + get.translation(r.rule.targetRule) + "]规则");
                                        if (r.rule.dmgDelta !== 0) details.push("伤害" + (r.rule.dmgDelta > 0 ? "+" : "") + r.rule.dmgDelta);
                                        if (r.rule.extraResolve > 0) details.push("额外结算" + r.rule.extraResolve + "次");
                                        if (r.rule.replaceBasic) details.push("涉及的基本牌名改为【" + get.translation(r.rule.replaceBasic) + "】");
                                        if (r.rule.timingMode) {
                                            var tMap = { phaseDraw: "摸牌阶段", phaseDiscard: "弃牌阶段", dying: "有人濒死时", onTrick: "有人使用锦囊时" };
                                            details.push("时机改为[" + (tMap[r.rule.timingMode] || r.rule.timingMode) + "]");
                                        }
                                        str += details.join("；") + "<br>";
                                    });
                                }
                                return str;
                            }
                        },
                        // 并列绑定：开局扣牌/原生深度钩子 + 伤害 + 多次结算 + 基本牌替换 + 四大时机监听 + 绝对封锁 + 轮次清理
                        group: [
                            "ms_gouzao_init",
                            "ms_gouzao_dmg",
                            "ms_gouzao_repeat",
                            "ms_gouzao_replace_basic",
                            "ms_gouzao_timing_trigger",
                            "ms_gouzao_timing_dying",
                            "ms_gouzao_timing_ontrick",
                            "ms_gouzao_mod",
                            "ms_gouzao_clear"
                        ],
                        trigger: {
                            player: "useCard1",          // 你使用牌时
                            target: "useCardToTargeted"  // 他人对你使用牌时
                        },
                        filter: function (event, player, name) {
                            if (!event.card) return false;

                            // 【防坑1：杜绝自己对自己用牌时的双重触发】
                            // 如果 event.name 不是 'useCard'（说明当前是 useCardToTargeted 触发），
                            // 且 event.player === player（说明是你自己对自己用牌），则 useCard1 必然已经触发过，直接拦截！
                            if (event.name !== 'useCard' && event.player === player) return false;

                            // 【防坑2：底层主事件互斥锁，一牌只问一次】
                            var useEvt = event.name === 'useCard' ? event : (event.getParent ? event.getParent('useCard') : null);
                            if (useEvt && useEvt._ms_gouzao_asked) return false;

                            var cname = get.name(event.card);
                            var validBasics = ['sha', 'jiu', 'tao'];
                            if (cname === 'wuxie') return false;
                            if (get.type(event.card) !== 'trick' && !validBasics.includes(cname)) return false;

                            var cards = player.storage.ms_gouzao_cards || [];
                            return cards.some(function (c) { return get.name(c) === cname; });
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var trigger = event._trigger || event.trigger || _status.event._trigger;

                            // 【立刻上锁】：进入执行逻辑后，立刻给主事件打上标记。
                            // 无论你后续是选择构造还是点击取消，这一张牌在后续的流程中绝对不会再询问第二次！
                            var useEvt = trigger.name === 'useCard' ? trigger : (trigger.getParent ? trigger.getParent('useCard') : null);
                            if (useEvt) useEvt._ms_gouzao_asked = true;

                            var cname = get.name(trigger.card);
                            event.cname = cname;

                            // 1. 弃置武将牌上的同名字典牌
                            var cards = player.storage.ms_gouzao_cards || [];
                            var matchIndex = -1;
                            for (var i = 0; i < cards.length; i++) {
                                if (get.name(cards[i]) === event.cname) {
                                    matchIndex = i;
                                    break;
                                }
                            }
                            if (matchIndex !== -1) {
                                var toDiscard = cards.splice(matchIndex, 1)[0];
                                player.syncStorage('ms_gouzao_cards');
                                if (cards.length === 0) player.unmarkSkill('ms_gouzao');
                                else player.markSkill('ms_gouzao');

                                game.log(player, '弃置了武将牌上的【' + get.translation(toDiscard) + '】，启动【全局规则】热更新！');
                                if (toDiscard.discard) toDiscard.discard();
                            }

                            event.customRule = {
                                targetRule: null,   // 1.合法目标
                                dmgDelta: 0,        // 2.伤害数增减
                                extraResolve: 0,    // 3.结算次数
                                replaceBasic: null, // 4.涉及基本牌
                                timingMode: null    // 5.使用时机
                            };

                            'step 1'
                            var player = event.player || _status.event.player;
                            var r = event.customRule;
                            var summary = "当前全局配置 ➔ ";
                            var parts = [];
                            if (r.targetRule) parts.push("目标:【" + get.translation(r.targetRule) + "】");
                            if (r.dmgDelta !== 0) parts.push("伤害:" + (r.dmgDelta > 0 ? "+" : "") + r.dmgDelta);
                            if (r.extraResolve > 0) parts.push("额外结算:" + r.extraResolve + "次");
                            if (r.replaceBasic) parts.push("要求:【" + get.translation(r.replaceBasic) + "】");
                            if (r.timingMode) {
                                var tMap = { phaseDraw: "摸牌阶段", phaseDiscard: "弃牌阶段", dying: "有人濒死时", onTrick: "有人使用锦囊时" };
                                parts.push("时机:" + (tMap[r.timingMode] || r.timingMode));
                            }
                            summary += parts.length > 0 ? parts.join("；") : "默认常规规则";

                            var choices = [
                                "1. 修改合法目标",
                                "2. 修改伤害数值",
                                "3. 修改结算次数",
                                "4. 修改涉及基本牌",
                                "5. 修改使用时机",
                                "✅ 确认配置并向全场立刻生效！"
                            ];

                            player.chooseControl(choices).set('prompt', '【构造】请为全局卡牌【' + get.translation(event.cname) + '】修改全场所有角色适用的游戏规则<br><span style="color:#e67e22;font-size:12px;">' + summary + '</span>');

                            'step 2'
                            var player = event.player || _status.event.player;
                            var ctrl = result.control;

                            if (ctrl === "✅ 确认配置并向全场立刻生效！") {
                                _status.ms_gouzao_ledger = _status.ms_gouzao_ledger || [];
                                _status.ms_gouzao_ledger = _status.ms_gouzao_ledger.filter(function (item) { return item.cname !== event.cname; });
                                _status.ms_gouzao_ledger.push({
                                    cname: event.cname,
                                    rule: event.customRule
                                });
                                game.log(player, '成功将【' + get.translation(event.cname) + '】的游戏规则重构为了全局法则，全场角色执行直至本轮结束！');
                                event.finish();
                                return;
                            }

                            if (ctrl === "1. 修改合法目标") {
                                player.chooseControl([
                                    "铁索式",
                                    "火攻式",
                                    "借刀杀人式",
                                    "过河拆桥式",
                                    "顺手牵羊式",
                                    "杀式",
                                    "无中生有式",
                                    "南蛮入侵式",
                                    "五谷丰登式",
                                    "保持默认目标规则"
                                ]).set('prompt', '【合法目标修改】请选择全场适用的选目标法则：');
                                event.subStep = 1;
                            } else if (ctrl === "2. 修改伤害数值") {
                                player.chooseControl(["伤害 +1", "伤害 -1", "保持不变"]).set('prompt', '【伤害修改】令此牌造成的真实伤害：');
                                event.subStep = 2;
                            } else if (ctrl === "3. 修改结算次数") {
                                player.chooseControl(["额外结算 1 次", "保持不变"]).set('prompt', '【结算次数修改】令此牌在全场生效后：');
                                event.subStep = 3;
                            } else if (ctrl === "4. 修改涉及基本牌") {
                                player.chooseControl([
                                    "改为要求出【桃】",
                                    "改为要求出【闪】",
                                    "改为要求出【杀】",
                                    "改为要求出【酒】",
                                    "保持默认基本牌"
                                ]).set('prompt', '【涉及基本牌修改】当此牌要求全场角色响应出牌时：');
                                event.subStep = 4;
                            } else if (ctrl === "5. 修改使用时机") {
                                // 【核心升级】：加入“有人濒死时”和“有人使用锦囊时”！
                                player.chooseControl([
                                    "改为仅在[摸牌阶段]可用",
                                    "改为仅在[弃牌阶段]可用",
                                    "改为仅在[有人濒死时]可用",
                                    "改为仅在[有人使用锦囊时]可用",
                                    "保持常规使用时机"
                                ]).set('prompt', '【使用时机修改】将此牌的出牌时机限制为：');
                                event.subStep = 5;
                            }

                            'step 3'
                            var sub = result.control;
                            var r = event.customRule;
                            if (event.subStep === 1) {
                                if (sub.indexOf("铁索") !== -1) r.targetRule = 'tiesuo';
                                else if (sub.indexOf("火攻") !== -1) r.targetRule = 'huogong';
                                else if (sub.indexOf("借刀") !== -1) r.targetRule = 'jiedao';
                                else if (sub.indexOf("过河") !== -1) r.targetRule = 'guohe';
                                else if (sub.indexOf("顺手") !== -1) r.targetRule = 'shunshou';
                                else if (sub.indexOf("杀") !== -1) r.targetRule = 'sha';
                                else if (sub.indexOf("无中") !== -1) r.targetRule = 'wuzhong';
                                else if (sub.indexOf("南蛮") !== -1) r.targetRule = 'nanman';
                                else if (sub.indexOf("五谷") !== -1) r.targetRule = 'wugu';
                                else r.targetRule = null;
                            } else if (event.subStep === 2) {
                                if (sub === "伤害 +1") r.dmgDelta = 1;
                                else if (sub === "伤害 -1") r.dmgDelta = -1;
                                else r.dmgDelta = 0;
                            } else if (event.subStep === 3) {
                                if (sub === "额外结算 1 次") r.extraResolve = 1;
                                else r.extraResolve = 0;
                            } else if (event.subStep === 4) {
                                if (sub.indexOf("【桃】") !== -1) r.replaceBasic = 'tao';
                                else if (sub.indexOf("【闪】") !== -1) r.replaceBasic = 'shan';
                                else if (sub.indexOf("【杀】") !== -1) r.replaceBasic = 'sha';
                                else if (sub.indexOf("【酒】") !== -1) r.replaceBasic = 'jiu';
                                else r.replaceBasic = null;
                            } else if (event.subStep === 5) {
                                if (sub.indexOf("摸牌阶段") !== -1) r.timingMode = 'phaseDraw';
                                else if (sub.indexOf("弃牌阶段") !== -1) r.timingMode = 'phaseDiscard';
                                else if (sub.indexOf("有人濒死时") !== -1) r.timingMode = 'dying';
                                else if (sub.indexOf("有人使用锦囊时") !== -1) r.timingMode = 'onTrick';
                                else r.timingMode = null;
                            }
                            event.goto(1);
                        }
                    },

                    // ==========================================
                    // 【引擎零号：开局扣牌(含杀酒桃) + 双重时机死锁重写】
                    // ==========================================
                    ms_gouzao_init: {
                        trigger: {
                            global: ["gameStart", "battleStart"]
                        },
                        forced: true,
                        silent: true,
                        priority: 10000,
                        content: function (event, player) {
                            player.storage.ms_gouzao_cards = [];
                            var cardMap = {};
                            var validBasics = ['sha', 'jiu', 'tao'];

                            var pile = ui.cardPile ? ui.cardPile.childNodes : [];
                            for (var i = 0; i < pile.length; i++) {
                                var c = pile[i];
                                var cname = get.name(c);
                                if ((get.type(c) === 'trick' && cname !== 'wuxie') || validBasics.includes(cname)) {
                                    if (!cardMap[cname]) cardMap[cname] = [];
                                    cardMap[cname].push(c);
                                }
                            }

                            var toStore = [];
                            for (var key in cardMap) {
                                var arr = cardMap[key];
                                if (arr.length > 0) {
                                    var pick = arr[Math.floor(Math.random() * arr.length)];
                                    pick.remove();
                                    toStore.push(pick);
                                }
                            }

                            if (toStore.length > 0) {
                                player.storage.ms_gouzao_cards = toStore;
                                player.markSkill('ms_gouzao');
                                game.log(player, '触发了【构造】，将牌堆中', toStore.length, '张不同的锦囊与基本牌扣于武将牌上！');
                            }

                            // ==========================================
                            // 【绝杀升级】：动态包裹原生属性，让杀彻底解禁“对自己使用”！
                            // ==========================================
                            for (var cKey in lib.card) {
                                if (lib.card[cKey] && ((lib.card[cKey].type === 'trick' && cKey !== 'wuxie') || validBasics.includes(cKey))) {
                                    if (!lib.card[cKey]._orig_gouzao) {
                                        lib.card[cKey]._orig_gouzao = {
                                            selectTarget: lib.card[cKey].selectTarget,
                                            filterTarget: lib.card[cKey].filterTarget,
                                            toself: lib.card[cKey].toself,
                                            enable: lib.card[cKey].enable
                                        };

                                        (function (cname, orig) {
                                            // 1. 时机死锁原生 enable
                                            lib.card[cname].enable = function (card, player, event) {
                                                var ledger = _status.ms_gouzao_ledger || [];
                                                for (var idx = 0; idx < ledger.length; idx++) {
                                                    if (ledger[idx].cname === cname && ledger[idx].rule.timingMode) {
                                                        if (_status.event && _status.event._ms_gouzao_timing_auth) return true;
                                                        return false;
                                                    }
                                                }
                                                if (typeof orig.enable === 'function') return orig.enable.apply(this, arguments);
                                                if (orig.enable !== undefined) return orig.enable;
                                                return true;
                                            };

                                            // 2. 目标不过滤重写：针对火攻/铁索/五谷/桃园/无中，强行放行 target === player！
                                            lib.card[cname].filterTarget = function (card, player, target) {
                                                var ledger = _status.ms_gouzao_ledger || [];
                                                var ruleObj = null;
                                                for (var idx = 0; idx < ledger.length; idx++) {
                                                    if (ledger[idx].cname === cname) { ruleObj = ledger[idx].rule; break; }
                                                }
                                                if (ruleObj && ruleObj.targetRule) {
                                                    var t = ruleObj.targetRule;
                                                    if (t === 'tiesuo' || t === 'huogong' || t === 'wugu' || t === 'taoyuan') return true; // 全局任意角色可用！
                                                    if (t === 'wuzhong') return target === player; // 仅限自己
                                                    if (t === 'guohe' || t === 'nanman') return target !== player;
                                                    if (t === 'shunshou') return target !== player && get.distance(player, target) <= 1;
                                                    if (t === 'sha') return target !== player && player.inRange(target);
                                                    if (t === 'jiedao') {
                                                        if (typeof ui !== 'undefined' && ui.selected && ui.selected.targets.length === 0) {
                                                            return target !== player && target.getEquip(1) && game.hasPlayer(function (current) { return target !== current && current !== player && target.canUse('sha', current); });
                                                        } else if (typeof ui !== 'undefined' && ui.selected && ui.selected.targets.length > 0) {
                                                            return target !== ui.selected.targets[0] && target !== player && ui.selected.targets[0].canUse('sha', target);
                                                        }
                                                        return false;
                                                    }
                                                }
                                                if (typeof orig.filterTarget === 'function') return orig.filterTarget.apply(this, arguments);
                                                return true;
                                            };

                                            // 3. 选人数量：AOE（无中/南蛮/五谷/桃园）强行改 -1 全自动选定！
                                            Object.defineProperty(lib.card[cname], 'selectTarget', {
                                                get: function () {
                                                    var ledger = _status.ms_gouzao_ledger || [];
                                                    for (var idx = 0; idx < ledger.length; idx++) {
                                                        if (ledger[idx].cname === cname && ledger[idx].rule.targetRule) {
                                                            var t = ledger[idx].rule.targetRule;
                                                            if (t === 'tiesuo' || t === 'jiedao') return [1, 2];
                                                            if (t === 'huogong' || t === 'guohe' || t === 'shunshou' || t === 'sha') return 1;
                                                            if (t === 'wuzhong' || t === 'nanman' || t === 'wugu' || t === 'taoyuan') return -1;
                                                        }
                                                    }
                                                    return orig.selectTarget;
                                                },
                                                configurable: true
                                            });

                                            // 4. 【核心修复】：只要改为了火攻、铁索、五谷、桃园、无中，强行开启 toself: true，允许鼠标点选自己！
                                            Object.defineProperty(lib.card[cname], 'toself', {
                                                get: function () {
                                                    var ledger = _status.ms_gouzao_ledger || [];
                                                    for (var idx = 0; idx < ledger.length; idx++) {
                                                        if (ledger[idx].cname === cname && ledger[idx].rule.targetRule) {
                                                            var t = ledger[idx].rule.targetRule;
                                                            if (t === 'wuzhong' || t === 'huogong' || t === 'tiesuo' || t === 'wugu' || t === 'taoyuan') {
                                                                return true;
                                                            }
                                                        }
                                                    }
                                                    return orig.toself;
                                                },
                                                configurable: true
                                            });
                                        })(cKey, lib.card[cKey]._orig_gouzao);
                                    }
                                }
                            }
                        },
                        sub: true
                    },

                    ms_gouzao_dmg: {
                        trigger: { global: "damageBegin1" },
                        forced: true, silent: true, priority: 10000,
                        filter: function (event, player) {
                            if (!event.card || !event.source) return false;
                            var ledger = _status.ms_gouzao_ledger || [];
                            return ledger.some(function (r) { return get.name(event.card) === r.cname && r.rule.dmgDelta !== 0; });
                        },
                        content: function (event, trigger, player) {
                            var ledger = _status.ms_gouzao_ledger || [];
                            ledger.forEach(function (r) {
                                if (get.name(trigger.card) === r.cname && r.rule.dmgDelta !== 0) {
                                    trigger.num += r.rule.dmgDelta;
                                    trigger.num = Math.max(0, trigger.num);
                                    game.log(trigger.source, '使用的【' + get.translation(r.cname) + '】执行全局【构造】法则，伤害变为', trigger.num);
                                }
                            });
                        },
                        sub: true
                    },

                    ms_gouzao_repeat: {
                        trigger: { global: "useCardAfter" },
                        forced: true, silent: true, priority: 10000,
                        filter: function (event, player) {
                            if (!event.card || event._ms_gouzao_repeated) return false;
                            var ledger = _status.ms_gouzao_ledger || [];
                            return ledger.some(function (r) { return get.name(event.card) === r.cname && r.rule.extraResolve > 0; });
                        },
                        content: function (event, trigger, player) {
                            var ledger = _status.ms_gouzao_ledger || [];
                            for (var i = 0; i < ledger.length; i++) {
                                var r = ledger[i];
                                if (get.name(trigger.card) === r.cname && r.rule.extraResolve > 0) {
                                    game.log(trigger.player, '使用的【' + get.translation(r.cname) + '】执行全局【构造】法则，额外结算 1 次！');
                                    trigger._ms_gouzao_repeated = true;
                                    var next = trigger.player.useCard(trigger.card, trigger.targets ? trigger.targets.slice() : [], true, false);
                                    if (next) {
                                        next._ms_gouzao_repeated = true;
                                        next.noLimit = true;
                                        next.addCount = false;
                                    }
                                    break;
                                }
                            }
                        },
                        sub: true
                    },

                    ms_gouzao_replace_basic: {
                        // 【硬核物理隔离】：彻底砍掉和“响应抵消”毫无关系的 chooseToUseBegin！
                        // 南蛮/万箭/决斗/杀在底层响应防守永远只走 chooseToRespond；
                        // 濒死求桃永远走 chooseToUse。锁定 chooseToRespondBegin 即可100%免疫吞桃！
                        trigger: {
                            global: "chooseToRespondBegin"
                        },
                        forced: true,
                        silent: true,
                        priority: 10000,
                        filter: function (event, player) {
                            var useEvt = event.getParent ? event.getParent('useCard') : null;
                            if (!useEvt || !useEvt.card) return false;

                            var ledger = _status.ms_gouzao_ledger || [];
                            return ledger.some(function (r) {
                                return get.name(useEvt.card) === r.cname && r.rule.replaceBasic;
                            });
                        },
                        content: function (event, trigger, player) {
                            var useEvt = trigger.getParent('useCard');
                            var ledger = _status.ms_gouzao_ledger || [];
                            ledger.forEach(function (r) {
                                if (get.name(useEvt.card) === r.cname && r.rule.replaceBasic) {
                                    var newBasic = r.rule.replaceBasic;
                                    trigger.filterCard = function (card) {
                                        return get.name(card) === newBasic;
                                    };
                                    trigger.prompt = '【全局构造法则】要求响应必须打出/使用一张【' + get.translation(newBasic) + '】来抵消！';

                                    // ==========================================
                                    // 【核心绝杀 修复防守失效】：
                                    // 彻底关闭选目标需求！无论响应杀、酒还是火攻，点击后直接提交作为防守抵消，绝不弹窗要求选目标！
                                    // ==========================================
                                    trigger.selectTarget = -1;
                                    trigger.targetRequired = false;
                                    trigger.noTarget = true;
                                    trigger.ignoreTarget = true;

                                    if (trigger.ai && trigger.ai.respondSha) delete trigger.ai.respondSha;
                                    if (trigger.ai && trigger.ai.respondShan) delete trigger.ai.respondShan;
                                }
                            });
                        },
                        sub: true
                    },

                    // ==========================================
                    // 【替换模块一：常规摸牌/弃牌时机唤醒】
                    // ==========================================
                    ms_gouzao_timing_trigger: {
                        trigger: {
                            global: ["phaseDrawBegin", "phaseDiscardBegin"]
                        },
                        forced: true,
                        silent: true,
                        priority: 1000,
                        filter: function (event, player, name) {
                            var firstOwner = game.filterPlayer(function (p) { return p.hasSkill('ms_gouzao', true); })[0];
                            if (player !== firstOwner) return false;

                            var current = event.player;
                            var ledger = _status.ms_gouzao_ledger || [];
                            if (ledger.length === 0) return false;

                            var isDraw = (event.name === 'phaseDraw' || name === 'phaseDrawBegin' || (event.triggername && event.triggername.indexOf('Draw') !== -1) || (event.name && event.name.indexOf('Draw') !== -1));
                            var curPhase = isDraw ? 'phaseDraw' : 'phaseDiscard';

                            return ledger.some(function (r) {
                                return r.rule.timingMode === curPhase && current.hasCard(function (c) {
                                    return get.name(c) === r.cname;
                                }, 'hs');
                            });
                        },
                        content: function () {
                            'step 0'
                            var trigger = event._trigger || event.trigger || _status.event._trigger;
                            var current = trigger.player;
                            var isDraw = (trigger.name === 'phaseDraw' || trigger.triggername === 'phaseDrawBegin' || (trigger.name && trigger.name.indexOf('Draw') !== -1));
                            var curPhase = isDraw ? 'phaseDraw' : 'phaseDiscard';

                            var availNames = [];
                            var ledger = _status.ms_gouzao_ledger || [];
                            ledger.forEach(function (r) {
                                if (r.rule.timingMode === curPhase && !availNames.includes(r.cname)) {
                                    if (current.hasCard(function (c) { return get.name(c) === r.cname; }, 'hs')) {
                                        availNames.push(r.cname);
                                    }
                                }
                            });
                            if (availNames.length === 0) {
                                event.finish();
                                return;
                            }
                            event.availNames = availNames;

                            // 【核心绝杀】：优先读取形参 evt.availNames 和闭包 availNames，彻底杜绝八卦阵等底层检测报错！
                            current.chooseToUse('【构造全局法则】在你自己的' + (curPhase === 'phaseDraw' ? '摸牌阶段' : '弃牌阶段') + '，你可以选择打出一张被修改了时机的卡牌', function (card, player, evt) {
                                var names = (evt && evt.availNames) ? evt.availNames : (_status.event.availNames || availNames || []);
                                return names.includes(get.name(card));
                            }).set('availNames', availNames).set('_ms_gouzao_timing_auth', true).set('addCount', false);

                            'step 1'
                            if (result.bool) {
                                event.goto(0);
                            }
                        },
                        sub: true
                    },

                    // ==========================================
                    // 【替换模块二：有人濒死时 唤醒】(桃的时机)
                    // ==========================================
                    ms_gouzao_timing_dying: {
                        // 【核心绝杀】：将死钩子 "dying" 修正为引擎底层真实抛出的 "dyingBegin"！
                        trigger: { global: "dyingBegin" },
                        forced: true,
                        silent: true,
                        priority: 10,
                        filter: function (event, player) {
                            var ledger = _status.ms_gouzao_ledger || [];
                            if (ledger.length === 0) return false;
                            return ledger.some(function (r) {
                                return r.rule.timingMode === 'dying' && player.hasCard(function (c) {
                                    return get.name(c) === r.cname;
                                }, 'hs');
                            });
                        },
                        content: function () {
                            'step 0'
                            // 【核心作用域防坑】：在 global 触发器中，event.player 是正在濒死的角色！
                            // 绝对不能写 var player = event.player！直接使用引擎传进来的形参 player（即拥有本技能的角色）
                            var availNames = [];
                            var ledger = _status.ms_gouzao_ledger || [];
                            ledger.forEach(function (r) {
                                if (r.rule.timingMode === 'dying' && !availNames.includes(r.cname)) {
                                    if (player.hasCard(function (c) { return get.name(c) === r.cname; }, 'hs')) {
                                        availNames.push(r.cname);
                                    }
                                }
                            });
                            if (availNames.length === 0) {
                                event.finish();
                                return;
                            }
                            event.availNames = availNames;

                            // 【白皮书特权对齐】：穿透 availNames，打上 _ms_gouzao_timing_auth 与 addCount:false
                            player.chooseToUse('【构造全局法则】有人濒死，你可以打出一张时机被改为[有人濒死时]的卡牌', function (card, player, evt) {
                                var names = (evt && evt.availNames) ? evt.availNames : (_status.event.availNames || availNames || []);
                                return names.includes(get.name(card));
                            }).set('availNames', availNames).set('_ms_gouzao_timing_auth', true).set('addCount', false);

                            'step 1'
                            if (result.bool) event.goto(0);
                        },
                        sub: true
                    },

                    // ==========================================
                    // 【替换模块三：有人使用锦囊时 唤醒】(无懈的时机)
                    // ==========================================
                    ms_gouzao_timing_ontrick: {
                        trigger: { global: "useCard1" },
                        forced: true, silent: true, priority: 1000,
                        filter: function (event, player) {
                            if (!event.card || get.type(event.card) !== 'trick') return false;
                            var ledger = _status.ms_gouzao_ledger || [];
                            if (ledger.length === 0) return false;
                            return ledger.some(function (r) {
                                return r.rule.timingMode === 'onTrick' && player.hasCard(function (c) { return get.name(c) === r.cname; }, 'hs');
                            });
                        },
                        content: function () {
                            'step 0'
                            var player = event.player || _status.event.player;
                            var availNames = [];
                            var ledger = _status.ms_gouzao_ledger || [];
                            ledger.forEach(function (r) {
                                if (r.rule.timingMode === 'onTrick' && !availNames.includes(r.cname)) {
                                    if (player.hasCard(function (c) { return get.name(c) === r.cname; }, 'hs')) availNames.push(r.cname);
                                }
                            });
                            if (availNames.length === 0) { event.finish(); return; }
                            event.availNames = availNames;

                            // 【核心绝杀】：安全闭包校验
                            player.chooseToUse('【构造全局法则】有角色使用了锦囊，你可以打出一张时机被改为[有人使用锦囊时]的卡牌', function (card, player, evt) {
                                var names = (evt && evt.availNames) ? evt.availNames : (_status.event.availNames || availNames || []);
                                return names.includes(get.name(card));
                            }).set('availNames', availNames).set('_ms_gouzao_timing_auth', true).set('addCount', false);

                            'step 1'
                            if (result.bool) event.goto(0);
                        },
                        sub: true
                    },

                    // ==========================================
                    // 【引擎封锁：UI卡牌灰色禁用第二道关卡】
                    // ==========================================
                    ms_gouzao_mod: {
                        mod: {
                            // 【核心绝杀 突破硬编码】：在 targetEnabled 与 targetInRange 里强行开绿灯！
                            targetEnabled: function (card, player, target) {
                                if (!card) return;
                                var ledger = _status.ms_gouzao_ledger || [];
                                var cname = get.name(card);
                                for (var i = 0; i < ledger.length; i++) {
                                    var r = ledger[i];
                                    if (cname === r.cname && r.rule.targetRule) {
                                        var t = r.rule.targetRule;
                                        // 只要全局修改为了火攻、铁索、五谷、桃园、无中，强行打通 target === player，推翻杀不能砍自己的铁律！
                                        if (t === 'huogong' || t === 'tiesuo' || t === 'wugu' || t === 'taoyuan' || t === 'wuzhong') {
                                            if (target === player) return true;
                                        }
                                        var templateCard = { name: t, isCard: true };
                                        if (lib.filter.targetEnabled(templateCard, player, target)) return true;
                                    }
                                }
                            },
                            targetInRange: function (card, player, target) {
                                if (!card) return;
                                var ledger = _status.ms_gouzao_ledger || [];
                                var cname = get.name(card);
                                for (var i = 0; i < ledger.length; i++) {
                                    if (cname === ledger[i].cname && ledger[i].rule.targetRule) {
                                        return true; // 只要修改了目标法则，全场攻击距离与限制全部无视！
                                    }
                                }
                            },
                            cardEnabled: function (card, player) {
                                if (!card || _status.currentPhase !== player) return;
                                var ledger = _status.ms_gouzao_ledger || [];
                                for (var i = 0; i < ledger.length; i++) {
                                    var r = ledger[i];
                                    if (get.name(card) === r.cname && r.rule.timingMode) {
                                        if (!_status.event || !_status.event._ms_gouzao_timing_auth) {
                                            return false;
                                        }
                                    }
                                }
                            }
                        },
                        sub: true
                    },

                    ms_gouzao_clear: {
                        // 【完全对齐官方 olxiaoxi 规范】：绝不添加任何多余的判断，轮次开始铁血清空！
                        trigger: {
                            global: "roundStart",
                        },
                        forced: true,
                        silent: true,
                        priority: 100000,
                        filter: function (event, player) {
                            var ledger = _status.ms_gouzao_ledger || [];
                            return ledger.length > 0;
                        },
                        content: function (event, player) {
                            _status.ms_gouzao_ledger = [];
                            game.log(player, '🔥 一轮游戏开始，【构造】设置的上一轮全局规则已全部清空！');
                        },
                        sub: true
                    },

                    ms_dedao: {
                        audio: 2,
                        mark: true,
                        marktext: "道",
                        intro: {
                            content: function (storage, player) {
                                if (!Array.isArray(storage)) return "当前修道进度：<b>0 / 4</b> 种";
                                var names = storage.map(function (n) { return get.translation(n); }).join("、");
                                return "已用牌名：<b>" + (names || "无") + "</b><br>修道进度：<b>" + storage.length + " / 4</b> 种";
                            }
                        },
                        trigger: {
                            player: "useCard1"
                        },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            // 【第一道安全锁】：确保事件和卡牌实体真实存在
                            if (!event || !event.card) return false;
                            var cname = event.card.name;
                            if (!cname || typeof cname !== 'string') return false;

                            // 【第二道安全锁】：确保 storage 是合法的纯数组
                            var arr = player.storage.ms_dedao;
                            if (!Array.isArray(arr)) {
                                arr = [];
                                player.storage.ms_dedao = arr;
                            }

                            // 极简排重：已经记录过的名字，直接无视！
                            return !arr.includes(cname);
                        },
                        content: function () {
                            'step 0'
                            // 【核心绝杀 彻底防崩溃】：
                            // 在 content 里必须用 event._trigger 来抓取触发事件！
                            var trigger = event._trigger || event.trigger || _status.event._trigger || event;
                            if (!trigger || !trigger.card) {
                                event.finish();
                                return;
                            }

                            var cname = trigger.card.name;
                            if (!cname || typeof cname !== 'string') {
                                event.finish();
                                return;
                            }

                            if (!Array.isArray(player.storage.ms_dedao)) player.storage.ms_dedao = [];

                            // 存入新牌名
                            player.storage.ms_dedao.push(cname);
                            player.syncStorage('ms_dedao');
                            player.markSkill('ms_dedao');

                            if (player.storage.ms_dedao.length >= 4) {
                                player.chooseBool('是否发动【得道】清空已记牌名，摸四张牌？');
                            } else {
                                event.finish();
                            }

                            'step 1'
                            if (result && result.bool) {
                                player.storage.ms_dedao = [];
                                player.syncStorage('ms_dedao');
                                player.markSkill('ms_dedao');
                                player.logSkill('ms_dedao');
                                player.draw(4);
                            }
                        }
                    },

                    ms_manman: {
                        audio: 2,
                        mark: true,
                        marktext: "漫",
                        limited: true,
                        skillAnimation: true,
                        intro: {
                            content: function (storage, player) {
                                if (_status.ms_manman_active) return "<span style='color:red;font-weight:bold;'>🔥 【漫漫】领域展开中：</span>全场仅剩出牌阶段，限出一牌，不出牌则流失体力！";
                                return player.storage.ms_manman_used ? "限定技已使用" : "限定技未发动";
                            }
                        },
                        trigger: {
                            global: "roundStart"
                        },
                        filter: function (event, player) {
                            return !player.storage.ms_manman_used;
                        },
                        check: function (event, player) {
                            return true;
                        },
                        content: function () {
                            player.storage.ms_manman_used = true;
                            player.awakenSkill('ms_manman');
                            _status.ms_manman_active = true;

                            // 【核心修正】：前3个规则作为全局战场法则投影到全场，第4个濒死破局作为独家监听挂在施法者（你）自己身上！
                            game.addGlobalSkill('ms_manman_skip');
                            game.addGlobalSkill('ms_manman_monitor');
                            game.addGlobalSkill('ms_manman_penalty');
                            player.addSkill('ms_manman_dying');

                            game.log(player, '发动了限定技', '#g【漫漫】', '，永无止尽的八月，全场角色的回合将只剩下出牌阶段！');
                        },
                    },

                    // ==========================================
                    // 【替换模块一：直击建议——检测到非出牌阶段立刻实时跳过】
                    // ==========================================
                    ms_manman_skip: {
                        trigger: {
                            player: [
                                "phaseBefore",
                                // 【核心补全】：监听所有非出牌阶段的真实启动时机！
                                "phaseZhunbeiBefore", "phaseZhunbeiBegin",
                                "phaseJudgeBefore", "phaseJudgeBegin",
                                "phaseDrawBefore", "phaseDrawBegin",
                                "phaseDiscardBefore", "phaseDiscardBegin",
                                "phaseJieshuBefore", "phaseJieshuBegin"
                            ]
                        },
                        forced: true,
                        silent: true,
                        priority: 100000,
                        filter: function (event, player) {
                            return _status.ms_manman_active === true;
                        },
                        content: function (event, player) {
                            if (event.triggername === 'phaseBefore') {
                                // 第一重保险：常规标记跳过
                                player.skip('phaseZhunbei');
                                player.skip('phaseJudge');
                                player.skip('phaseDraw');
                                player.skip('phaseDiscard');
                                player.skip('phaseJieshu');
                            } else {
                                // 第二重绝杀（直击建议：“检测到不是出牌阶段就跳过”）：
                                // 一旦一号位首轮漏网、或者任何非出牌阶段真正试图执行时，
                                // 抓取当前阶段事件，立刻实时终结，绝不修改底层的 phases 数组！
                                var evt = _status.event.parent || event.parent;
                                if (evt) {
                                    if (typeof evt.cancel === 'function') evt.cancel();
                                    evt.unloop = true;
                                    if (typeof evt.step === 'number') evt.step = 10000;
                                }
                            }
                        }
                    },

                    // ==========================================
                    // 【替换模块二：完全还原你验证过的原版熔断 + 安全防崩】
                    // ==========================================
                    ms_manman_monitor: {
                        trigger: {
                            player: ["phaseUseBegin", "useCard1", "useCardAfter"]
                        },
                        forced: true,
                        silent: true,
                        priority: 10000,
                        filter: function (event, player) {
                            return _status.ms_manman_active === true;
                        },
                        content: function (event, player) {
                            if (event.triggername === 'phaseUseBegin') {
                                player._ms_manman_used_card = false;
                                player._ms_manman_penalty_checked = false;
                            } else if (event.triggername === 'useCard1') {
                                // 严格校验是否处于真实的 phaseUse（出牌阶段）
                                var usePhase = _status.event.getParent('phaseUse') || event.getParent('phaseUse');
                                if (usePhase) {
                                    player._ms_manman_used_card = true;
                                }
                            } else if (event.triggername === 'useCardAfter') {
                                if (player._ms_manman_used_card) {
                                    var evt = _status.event.getParent('phaseUse') || event.getParent('phaseUse');
                                    if (evt) {
                                        game.log(player, '在出牌阶段内使用了一张牌，触发【漫漫】限制，出牌阶段立刻强制结束！');

                                        // 【尊重验证结果：保留原版完美的 finish 与 step 熔断】
                                        // 增设 typeof 防御，彻底避免与其它技能联动时抛出 finish is not a function！
                                        if (typeof evt.finish === 'function') evt.finish();
                                        evt.unloop = true;
                                        if (typeof evt.step === 'number') evt.step = 10000;
                                    }
                                }
                            }
                        }
                    },
                    // ==========================================
                    // 【全局法则三：白板流失体力惩罚】
                    // ==========================================
                    ms_manman_penalty: {
                        trigger: {
                            player: ["phaseUseEnd", "phaseUseAfter"]
                        },
                        forced: true,
                        silent: true,
                        priority: 10000,
                        filter: function (event, player) {
                            return _status.ms_manman_active === true;
                        },
                        content: function () {
                            if (!player._ms_manman_penalty_checked) {
                                player._ms_manman_penalty_checked = true;
                                if (!player._ms_manman_used_card) {
                                    game.log(player, '在出牌阶段内未能使用任何牌，触发【漫漫】惩罚，失去 1 点体力！');
                                    player.loseHp(1);
                                }
                            }
                        }
                    },

                    // ==========================================
                    // 【替换模块二：濒死终结（只要进入濒死立刻破局 + 大字幕特效回归）】
                    // ==========================================
                    ms_manman_dying: {
                        trigger: {
                            global: "dying"
                        },
                        forced: true,
                        priority: 100000,
                        filter: function (event, player) {
                            // 因为已设为施法者专属绑定，只要领域展开中，全场任何一个角色进入濒死立刻无条件触发！
                            return _status.ms_manman_active === true;
                        },
                        content: function () {
                            'step 0'
                            _status.ms_manman_active = false;
                            game.log(player, '的【漫漫】因有角色进入濒死状态而立刻失效！');

                            // 【大字幕特效华丽回归】：屏幕中央燃起红色火焰终结字样！
                            player.$fullscreenpop('漫漫·终结', 'fire');

                            // 【干净收场】：从全场卸载3大全局法则，同时从你身上卸载濒死监听，0污染！
                            game.removeGlobalSkill('ms_manman_skip');
                            game.removeGlobalSkill('ms_manman_monitor');
                            game.removeGlobalSkill('ms_manman_penalty');
                            player.removeSkill('ms_manman_dying');

                            // 1. 强行插入你的回合：当前被掐断的回合之后，下一个必定是你！
                            player.insertPhase();

                            // 2. 强行砸碎当前活动角色的阶段循环（绝对保留当前濒死求桃合法进行，不影响救人/死亡正常的结算流程）
                            var cur = _status.currentPhase;
                            if (cur && cur !== player) {
                                game.log('当前回合被立刻强行终止，即将跳转至', player, '的回合！');
                                var evt = _status.event;
                                while (evt) {
                                    if (evt.name === 'phaseUse' || evt.name === 'phase' || evt.name === 'turn') {
                                        evt.finish();
                                        evt.unloop = true;
                                        if (typeof evt.step === 'number') evt.step = 10000;
                                    }
                                    evt = evt.parent;
                                }
                            }
                        }
                    },

                    //—————————————————————————————————————白皇女—————————————————————————————————————————————

                    "ms_zhishi": {
                        audio: 2,
                        trigger: {
                            global: "useCardToTargeted"
                        },
                        filter: function (event, player) {
                            // 1. 核心防御：如果是牌堆发起的使用（带自定义标签），绝对不触发治世！
                            if (event.isDrawPileUse || (event.getParent() && event.getParent().isDrawPileUse)) return false;
                            if (!event.player || !event.player.isIn()) return false;
                            // 2. 必须是【杀】
                            if (event.card.name !== 'sha') return false;
                            // 3. 【核心修改】：删除了距离与目标限制！
                            // 只要被【杀】指定的目标是当前在场的合法角色，即可发动
                            if (!event.target || !event.target.isIn()) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            // --- 【中央字幕与特效系统】 ---
                            var quotes = [
                                "乱世用重典，治世以威刑！",
                                "止戈化武，以法度人。"
                            ];
                            var text = quotes.randomGet();
                            if (lib.config.show_banzer !== false) {
                                var div = ui.create.div(ui.window);
                                div.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); z-index:1000; pointer-events:none; font-size:32px; font-family:"STXinwei","华文新魏",serif; color:#ffd700; text-shadow:0 0 10px #000, 0 0 20px #000, 0 0 30px #ff0000; opacity:0; transition:all 0.5s ease-out; white-space:nowrap;';
                                div.innerHTML = '<b>【治世】</b> ' + text;
                                setTimeout(function () {
                                    div.style.opacity = '1';
                                    div.style.transform = 'translate(-50%, -60%)';
                                }, 50);
                                setTimeout(function () {
                                    div.style.opacity = '0';
                                    div.style.transform = 'translate(-50%, -70%)';
                                }, 2000);
                                setTimeout(function () {
                                    div.delete();
                                }, 2500);
                            }
                            player.say(text);
                            game.log(player, '：“<font color=yellow>' + text + '</font>”');
                            // --- 【特效结束】 ---

                            // --- 【彻底物理取消杀对原目标的指定】 ---
                            var useEvent = trigger.getParent();
                            useEvent.targets.remove(trigger.target); // 从杀的攻击目标列表中剔除
                            if (useEvent.targets.length === 0) {
                                useEvent.cancel(); // 如果没目标了，废弃全卡
                            }
                            trigger.cancel(); // 取消当前触发子事件

                            event.origTarget = trigger.target; // 记录被取消杀的原目标
                            event.user = trigger.player;       // 记录杀的使用者

                            if (!event.user || !event.user.isIn()) {
                                event.goto(3);
                                return;
                            }

                            var cards = event.user.getCards('h');
                            if (cards.length === 0) {
                                event.goto(3);
                                return;
                            }

                            var maxLen = 0;
                            for (var i = 0; i < cards.length; i++) {
                                var len = get.translation(cards[i].name).length;
                                if (len > maxLen) maxLen = len;
                            }

                            var longestCards = cards.filter(function (card) {
                                return get.translation(card.name).length === maxLen;
                            });

                            var targets = [event.user, player].unique();

                            var checkValid = function (card) {
                                var type = get.type(card);
                                if (type === 'equip' || type === 'delay') return false; // 排除装备和延时锦囊
                                if (card.name === 'wuxie' || card.name === 'shan') return false; // 排除无懈和闪

                                if (card.name === 'tao') {
                                    return (event.user.hp < event.user.maxHp || player.hp < player.maxHp);
                                }

                                if (card.name === 'jiedao') {
                                    return (event.user.hasWeapon() && event.user.inRange(player)) ||
                                        (player.hasWeapon() && player.inRange(event.user));
                                }

                                // --- 【核心修复：替代你原代码的无参 canUse(card)，既防报错又放开目标限制】 ---

                                // 1. 如果正常情况就能对【你】或【自己】使用，直接放行
                                if (event.user.canUse(card, player) || event.user.canUse(card, event.user)) {
                                    return true;
                                }

                                var canUseOnAny = game.players.some(function (target) {
                                    return event.user.canUse(card, target);
                                });
                                if (canUseOnAny) return true;

                                if (lib.filter.cardEnabled(card, event.user)) {
                                    return true;
                                }

                                return false;
                            };

                            var validCards = longestCards.filter(checkValid);

                            // 执行强制使用或跳转
                            if (validCards.length > 0) {
                                event.cardUsed = true;
                                if (validCards.length === 1) {
                                    event.user.useCard(validCards[0], targets);
                                } else {
                                    event.user.chooseCard(
                                        '治世：请选择手牌中牌名最长的一张牌，对你和' + get.translation(player) + '使用',
                                        function (card) {
                                            return validCards.contains(card);
                                        }
                                    ).set('forced', true).set('ai', function (card) {
                                        return get.value(card);
                                    });
                                }
                            } else {
                                event.cardUsed = false;
                            }

                            "step 1"
                            if (result && result.bool && result.cards && result.cards.length > 0) {
                                var targets = [event.user, player].unique();
                                event.user.useCard(result.cards[0], targets);
                            }

                            "step 2"
                            if (event.cardUsed) {
                                event.finish();
                            }

                            "step 3"
                            var topCards = get.cards(5);
                            game.cardsGotoOrdering(topCards);
                            player.showCards(topCards, '治世：展示牌堆顶五张牌');
                            event.topCards = topCards;

                            "step 4"
                            var damageCards = [];
                            var discardCards = [];

                            for (var i = 0; i < event.topCards.length; i++) {
                                var card = event.topCards[i];
                                var isDamage = get.tag(card, 'damage') > 0 || ['sha', 'juedou', 'nanman', 'wanjian', 'huogong'].contains(card.name);
                                if (isDamage) {
                                    damageCards.push(card);
                                } else {
                                    discardCards.push(card);
                                }
                            }

                            if (discardCards.length > 0) {
                                game.cardsDiscard(discardCards);
                            }

                            event.damageCards = damageCards;

                            "step 5"
                            if (event.damageCards && event.damageCards.length > 0) {
                                var cardToUse = event.damageCards.shift();
                                if (event.origTarget && event.origTarget.isIn()) {
                                    game.log('牌堆顶对', event.origTarget, '使用了', cardToUse);

                                    // 依然必须借用一个存活角色作为物理宿主，保证引擎 UI 渲染与发牌动画有起点，绝不报错
                                    var caller = _status.currentPhase || player;
                                    if (caller === event.origTarget) caller = player;

                                    // 【标准调用】只传卡牌和目标，创建标准的卡牌使用事件
                                    var next = caller.useCard(cardToUse, event.origTarget);

                                    next.set('addCount', false);

                                    // 2. 【彻底屏蔽宿主技能联动】
                                    next.set('noSkill', true);

                                    // 3. 【防死循环专有标签】
                                    next.set('isDrawPileUse', true);

                                } else {
                                    game.cardsDiscard(cardToUse);
                                }

                                if (event.damageCards.length > 0) {
                                    event.redo();
                                }
                            }
                        }
                    },


                    //—————————————————————————————————————苍蓝星————————————————————————————————————————————

                    "ms_jiuku": {
                        audio: 2,
                        // 当你使用牌指定目标后（每个目标独立触发）
                        trigger: {
                            player: "useCardToPlayered"
                        },
                        filter: function (event, player) {
                            // 1. 目标必须合法且依然在场
                            if (!event.target || !event.target.isIn()) return false;

                            // 2. 【新增逻辑】：检索自己当前的手牌区（'h'）
                            var hasQing = player.getCards('h').some(function (card) {
                                return card.hasGaintag('情');
                            });

                            // 如果手里有“情”牌，则直接返回 false 拒绝发动；否则允许发动
                            return !hasQing;
                        },
                        content: function () {
                            "step 0"
                            var target = trigger.target;
                            event.target_player = target; // 记录当前要处理的目标

                            var controls = [];
                            // 只有自己有牌才能赠送
                            if (player.getCards('he').length > 0) {
                                controls.push('赠与情牌');
                            }
                            controls.push('调整手牌');
                            controls.push('cancel2');

                            player.chooseControl(controls).set('prompt', '救苦：对 ' + get.translation(target) + ' 选择一项').set('ai', function () {
                                var player = _status.event.player;
                                var lost = Math.max(0, player.maxHp - player.hp);
                                // AI 简单逻辑：如果缺牌严重则补牌，否则优先给友方发标记
                                if (player.getCards('h').length < lost) return '调整手牌';
                                if (_status.event.goon) return '赠与情牌';
                                return 'cancel2';
                            }).set('goon', get.attitude(player, target) > 0);

                            "step 1"
                            if (result.control === '赠与情牌') {
                                player.chooseCard('he', 1, true, '请选择一张牌交给 ' + get.translation(event.target_player) + '，作为“情”').set('ai', function (card) {
                                    return 7 - get.value(card); // AI优先给价值低的牌
                                });
                            } else if (result.control === '调整手牌') {
                                event.goto(3); // 跳转到手牌调整逻辑
                            } else {
                                event.finish(); // 取消则直接结束
                            }

                            "step 2"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                // 【核心实现】：通过 gain 获得卡牌的同时，强行注入 '情' 的 gaintag 标签！
                                // 只要牌不离开该角色的手牌/装备区，系统就会自动维护这个标签。
                                event.target_player.gain(result.cards, player, 'give').gaintag.add('情');
                                game.log(event.target_player, '获得了', result.cards, '作为', '#g【情】');
                            }
                            event.finish();

                            "step 3"
                            // --- 调整手牌至已损失体力值逻辑 ---
                            var lostHp = Math.max(0, player.maxHp - player.hp);
                            var handNum = player.getCards('h').length;

                            if (handNum > lostHp) {
                                // 牌多了，需要弃置
                                player.chooseToDiscard(handNum - lostHp, 'h', true).set('prompt', '救苦：请弃置 ' + (handNum - lostHp) + ' 张手牌');
                            } else if (handNum < lostHp) {
                                // 牌少了，直接摸牌
                                player.draw(lostHp - handNum);
                            }
                        }
                    },

                    "ms_nichang": {
                        audio: 2,
                        enable: "phaseUse",
                        filterTarget: function (card, player, target) {
                            return true; // 允许选择任意角色（包括自己）
                        },
                        selectTarget: 1,
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                // 【修改点】：追加 current.countCards('he') >= 2，必须牌数够印杀且持有情牌才允许发动
                                return current.countCards('he') >= 2 && current.getCards('he').some(function (c) {
                                    return c.hasGaintag('情');
                                });
                            });
                        },
                        content: function () {
                            "step 0"
                            var list = game.filterPlayer(function (current) {
                                return current.getCards('he').some(function (c) {
                                    return c.hasGaintag('情');
                                });
                            });

                            list.sortBySeat();
                            event.list = list;
                            event.target_player = targets[0] || target;

                            "step 1"
                            if (event.list.length > 0) {
                                var current = event.list.shift();
                                event.current_player = current;

                                // 【安全防卡死校验】：如果被集火的目标中途阵亡，直接终止整个后续队列，防止报错！
                                if (!event.target_player || !event.target_player.isIn()) {
                                    event.finish();
                                    return;
                                }

                                if (current.isIn() && current.countCards('he') >= 2) {
                                    var next = current.chooseToUse();
                                    next.set('prompt', '霓裳：你必须将两张牌当做无距离限制的【杀】对 ' + get.translation(event.target_player) + ' 使用');

                                    next.backup('ms_nichang_backup');
                                    next.set('custom_target', event.target_player);

                                    // 【修复1】：设为 true，彻底移除取消按钮，必须强制印牌！
                                    next.set('forced', true);

                                    // 赋予此刀特权：无视单回合出杀次数等限制
                                    next.set('noLimit', true);
                                } else {
                                    event.redo();
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            event.goto(1);
                        }
                    },

                    // --- 【霓裳】专属的强制印牌子技能 ---
                    "ms_nichang_backup": {
                        audio: 2,
                        selectTarget: -1,
                        filterCard: function (card, player) {
                            return true;
                        },
                        selectCard: 2,
                        position: "he",
                        viewAs: {
                            name: "sha"
                        },
                        // 【修复2核心】：必须在 backup 内部重写 filterTarget！
                        // 这样不仅锁死了目标，更直接强行覆盖掉了【杀】原版的距离限制，不再受位置限制！
                        filterTarget: function (card, player, target) {
                            return target === _status.event.custom_target;
                        },
                        prompt: "必须将两张牌当【杀】使用",
                        check: function (card) {
                            // 因为是强制执行，无论打谁，AI都优先扔掉手里最不值钱的废牌
                            return 6 - get.value(card);
                        },
                        sub: true
                    },

                    //—————————————————————————————————————龙宫理奈————————————————————————————————————————————


                    "ms_longzhan": {
                        audio: 2,
                        group: ["ms_longzhan_sha", "ms_longzhan_shan", "ms_longzhan_draw"]
                    },
                    // 子技能：当杀使用或打出
                    "ms_longzhan_sha": {
                        audio: 2,
                        enable: ["chooseToUse", "chooseToRespond"],
                        filterCard: function (card, player) {
                            return get.type(card) !== 'basic';
                        },
                        position: "he",
                        viewAs: { name: "sha" },
                        prompt: "将一张非基本牌当【杀】使用或打出（重铸）",
                        check: function (card) {
                            return 6 - get.value(card);
                        },
                        viewAsFilter: function (player) {
                            var evt = _status.event;
                            // 如果是正规出牌窗口，执行严谨校验
                            if (evt.name === 'chooseToRespond' || evt.name === 'chooseToUse') {
                                if (typeof evt.filterCard === 'function') {
                                    try {
                                        // 补上 isCard: true，防止某些特殊模式/技能查验时抛错
                                        return evt.filterCard({ name: 'sha', isCard: true }, player, evt);
                                    } catch (e) {
                                        return true;
                                    }
                                }
                            }
                            // 【核心修复】：如果是底层的预检测（如 hasSha），无条件放行，防止引擎自动跳过！
                            return true;
                        },
                        // 【核心修复】：打上专属引擎/AI标签，让底层系统识别出这是一个能印杀的技能
                        ai: {
                            respondSha: true,
                            order: function () {
                                return _status.event.player.hasCard(function (card) { return get.name(card) === 'sha'; }, 'hs') ? 2 : 4;
                            },
                            result: { player: 1 }
                        }
                    },

                    // 子技能：当闪使用或打出
                    "ms_longzhan_shan": {
                        audio: 2,
                        enable: ["chooseToRespond", "chooseToUse"],
                        filterCard: function (card, player) {
                            return get.type(card) !== 'basic';
                        },
                        position: "he",
                        viewAs: { name: "shan" },
                        prompt: "将一张非基本牌当【闪】打出（重铸）",
                        check: function (card) {
                            return 6 - get.value(card);
                        },
                        viewAsFilter: function (player) {
                            var evt = _status.event;
                            if (evt.name === 'chooseToRespond' || evt.name === 'chooseToUse') {
                                if (typeof evt.filterCard === 'function') {
                                    try {
                                        return evt.filterCard({ name: 'shan', isCard: true }, player, evt);
                                    } catch (e) {
                                        return true;
                                    }
                                }
                            }
                            // 【核心修复】：放行底层 hasShan 预检测，彻底消灭“明明有牌却不给窗口”的跳过 Bug
                            return true;
                        },
                        // 【核心修复】：打上专属引擎/AI标签，让底层系统识别出这是一个能印闪的技能
                        ai: {
                            respondShan: true,
                            order: function () {
                                // AI策略：如果手里有真闪，先用真闪；没有真闪再优先考虑用龙瞻重铸
                                return _status.event.player.hasCard(function (card) { return get.name(card) === 'shan'; }, 'hs') ? 2 : 4;
                            },
                            result: { player: 1 }
                        }
                    },
                    // 子技能：完成重铸的“摸牌”动作
                    "ms_longzhan_draw": {
                        trigger: {
                            player: ["useCard", "respond"]
                        },
                        filter: function (event, player) {
                            // 如果使用的卡牌是通过龙瞻印出来的，则触发摸牌
                            return event.skill === 'ms_longzhan_sha' || event.skill === 'ms_longzhan_shan';
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            player.draw();
                            game.log(player, '发动了', '#g【龙瞻】', '，重铸并摸了一张牌');
                        }
                    },



                    "ms_konghe": {
                        audio: 2,
                        forced: true,
                        trigger: {
                            player: "useCardAfter"
                        },
                        content: function () {
                            "step 0"
                            // 获取卡牌的所有目标
                            var targets = trigger.all_targets || trigger.targets || [];
                            event.target_list = targets.filter(function (t) { return t.isIn(); });

                            // 如果是无懈、闪等压根没有目标的牌，或者目标全死了，直接跳到 step 3 去打伤害
                            if (event.target_list.length === 0) {
                                event.goto(3);
                                return;
                            }
                            event.took_damage = false; // 记录自己是否因此受到过伤害

                            "step 1"
                            // 依次遍历所有目标，询问是否弃牌砸血
                            if (event.target_list.length > 0) {
                                event.current_target = event.target_list.shift();
                                var hp = Math.max(0, player.hp); // 防御周泰等负血武将导致判定异常

                                if (event.current_target.isIn() && player.isIn()) {
                                    if (hp === 0) {
                                        event.current_target.chooseBool('恐赫：是否对 ' + get.translation(player) + ' 造成1点伤害？').set('ai', function () {
                                            return get.attitude(_status.event.player, _status.event.source) < 0;
                                        }).set('source', player);
                                    } else if (event.current_target.countCards('he') >= hp) {
                                        event.current_target.chooseToDiscard('he', hp, '恐赫：是否弃置 ' + hp + ' 张牌并对 ' + get.translation(player) + ' 造成1点伤害？').set('ai', function (card) {
                                            if (get.attitude(_status.event.player, _status.event.source) >= 0) return -1;
                                            return 7 - get.value(card);
                                        }).set('source', player);
                                    } else {
                                        event.redo(); // 牌不够弃，直接跳过此人
                                    }
                                } else {
                                    event.redo();
                                }
                            } else {
                                event.goto(3); // 所有人问完了，进入判定环节
                            }

                            "step 2"
                            if (result.bool) {
                                player.damage(event.current_target);
                                event.took_damage = true;
                            }
                            event.goto(1); // 循环回到 step 1，问下一个目标

                            "step 3"
                            // 判定：如果在这个结算期内，没有任何人打掉你的血（或者压根没目标）
                            if (!event.took_damage && player.isIn()) {
                                player.chooseTarget('恐赫：未受到伤害，请选择一名角色造成1点伤害', 1, true, function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    return get.damageEffect(target, _status.event.player, _status.event.player);
                                });
                            } else {
                                event.finish();
                            }

                            "step 4"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                result.targets[0].damage(player);
                            }
                        }
                    },



                    "ms_zaodong": {
                        audio: 2,
                        trigger: {
                            player: "damageEnd"
                        },
                        filter: function (event, player) {
                            var history = player.getHistory('damage');
                            return history.indexOf(event) === 0; // 必须是本回合首次受到伤害
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget('躁动：选择一名手牌数不大于你的其它角色，其必须依次将所有的红色牌当【杀】使用', function (card, player, target) {
                                return target !== player && target.countCards('h') <= player.countCards('h');
                            }).set('ai', function (target) {
                                // AI策略：选有红牌的队友去当杀手，或者选残血敌人消耗牌
                                if (get.attitude(_status.event.player, target) <= 0) return 0;
                                return target.countCards('he');
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.target_player = result.targets[0];
                            } else {
                                event.finish();
                                return;
                            }

                            "step 2"
                            // 【核心循环点】：每次执行前，都重新判定目标是否还活着，以及是否还有合法的红色牌
                            if (!event.target_player || !event.target_player.isIn()) {
                                event.finish();
                                return;
                            }

                            // 探测器：检查该角色身上（he区）是否至少还有一张能当【杀】用的红色牌
                            // 条件：1. 颜色为红 2. 当成杀后，场上至少有一个人能被合法指定（判定了距离和防具限制）
                            var hasValidRed = event.target_player.hasCard(function (card) {
                                return lib.skill.ms_zaodong_backup.filterCard(card, event.target_player);
                            }, 'he');

                            if (hasValidRed) {
                                var next = event.target_player.chooseToUse();
                                next.set('forced', true);
                                next.set('prompt', '躁动：你必须将一张红色牌当【杀】使用');
                                next.set('norestore', true); // 禁止 UI 恢复到普通的出牌状态
                                next.set('_backupevent', 'ms_zaodong_backup'); // 强绑定底层 backup 标识
                                next.set('custom', {
                                    add: {},
                                    replace: { window: function () { } } // 覆盖掉点击背景空白处的默认取消事件
                                });
                                // ==========================================

                                next.backup('ms_zaodong_backup');
                                next.set('addCount', false);
                            } else {
                                event.finish();
                            }

                            "step 3"
                            // 这一刀（无论成功、被闪避还是目标阵亡）结算完毕后，强制跳回 step 2，继续逼迫出下一张！
                            event.goto(2);
                        }
                    },

                    // --- 【躁动】配套的强制印牌子技能 ---
                    "ms_zaodong_backup": {
                        audio: 2,
                        filterCard: function (card, player) {
                            if (get.color(card) !== 'red') return false; // 必须是红牌

                            // 预演：如果把这张牌当杀，有没有合法目标？
                            var sha = get.autoViewAs({ name: 'sha' }, [card]);
                            return game.hasPlayer(function (p) {
                                return player.canUse(sha, p); // 底层自带距离、空城等合法性校验
                            });
                        },
                        position: "he",
                        viewAs: {
                            name: "sha"
                        },
                        prompt: "必须将一张红色牌当【杀】使用",
                        check: function (card) {
                            return 6 - get.value(card); // AI 优先打出最废的红牌
                        },
                        sub: true
                    },

                    //—————————————————————————————————————尤斯缇雅————————————————————————————————————————————

                    "ms_tianshi": {
                        audio: 2,
                        locked: true,
                        forced: true,
                        mark: true,
                        intro: {
                            content: "你可以使用游戏中所有可见正面的牌；其他角色于你回合内获得牌后，须明置这些牌。"
                        },
                        init: function (player, skill) {
                            if (!player.storage.ms_tianshi_ui_daemon) {
                                player.storage.ms_tianshi_ui_daemon = setInterval(function () {
                                    if (!game || !game.players) return;
                                    game.players.forEach(function (p) {
                                        p.getCards('h').forEach(function (c) {
                                            if (c.hasGaintag('ms_tianshi_mingzhi') && !c.classList.contains('show')) {
                                                c.classList.add('show');
                                            }
                                        });
                                    });
                                }, 150);
                            }
                        },
                        onremove: function (player, skill) {
                            if (player.storage.ms_tianshi_ui_daemon) {
                                clearInterval(player.storage.ms_tianshi_ui_daemon);
                                delete player.storage.ms_tianshi_ui_daemon;
                            }
                            var fakes = player.getCards('s', function (c) { return c.hasGaintag("ms_tianshi_tag"); });
                            if (fakes.length > 0) game.deleteFakeCards(fakes);
                        },
                        group: ["ms_tianshi_reveal", "ms_tianshi_sync", "ms_tianshi_use"],
                        subSkill: {
                            reveal: {
                                audio: 2,
                                trigger: { global: "gainAfter" },
                                forced: true,
                                filter: function (event, player) {
                                    return _status.currentPhase === player && event.player !== player && event.cards && event.cards.length > 0;
                                },
                                content: function () {
                                    var handCards = trigger.cards.filter(function (c) {
                                        return trigger.player.getCards('h').includes(c);
                                    });
                                    if (handCards.length > 0) {
                                        trigger.player.addGaintag(handCards, 'ms_tianshi_mingzhi');
                                        game.log(trigger.player, '获得的', handCards, '被【天使】明置');
                                    }
                                },
                                sub: true
                            },

                            sync: {
                                trigger: {
                                    global: [
                                        "loseEnd", "gainEnd", "equipEnd", "addJudgeEnd",
                                        "discardEnd", "useCardEnd", "respondEnd", "useSkillEnd",
                                        "phaseZhunbeiBegin", "phaseUseBegin", "phaseUseEnd"
                                    ]
                                },
                                forced: true,
                                silent: true,
                                charlotte: true,
                                filter: function (event, player) { return true; },
                                content: function () {
                                    const tag = "ms_tianshi_tag";
                                    let validCards = [];

                                    game.players.concat(game.dead).forEach(function (p) {
                                        validCards.addArray(p.getCards('e'));

                                        // 【核心修复】：抓取判定区时，严格剔除蓄谋牌（背面朝上）
                                        var judgeCards = p.getCards('j').filter(function (c) {
                                            return (c.viewAs || c.name) !== "xumou_jsrg";
                                        });
                                        validCards.addArray(judgeCards);

                                        if (p !== player) {
                                            validCards.addArray(p.getCards('h').filter(function (c) { return c.hasGaintag('ms_tianshi_mingzhi'); }));
                                        }
                                    });

                                    if (ui.discardPile && ui.discardPile.childNodes.length > 0) {
                                        const topCard = ui.discardPile.childNodes[ui.discardPile.childNodes.length - 1];
                                        if (topCard && topCard.name) {
                                            validCards.push(topCard);
                                        }
                                    }

                                    const fakes = player.getCards('s', function (c) { return c.hasGaintag(tag); });
                                    const toRemove = fakes.filter(function (f) { return !validCards.some(function (v) { return v.cardid == f._cardid || v.cardid == f.cardid; }); });
                                    const toAdd = validCards.filter(function (v) { return !fakes.some(function (f) { return f._cardid == v.cardid || f.cardid == v.cardid; }); });

                                    if (toRemove.length > 0) { game.deleteFakeCards(toRemove); }
                                    if (toAdd.length > 0) { player.directgains(game.createFakeCards(toAdd), null, tag); }
                                },
                                sub: true
                            },

                            use: {
                                trigger: { player: ["useCardBefore", "respondBefore"] },
                                forced: true,
                                silent: true,
                                charlotte: true,
                                filter: function (event, player) {
                                    const fakes = player.getCards('s', function (c) { return c.hasGaintag("ms_tianshi_tag"); });
                                    return event.cards && event.cards.some(function (c) { return fakes.includes(c); });
                                },
                                content: function () {
                                    const tag = "ms_tianshi_tag";
                                    const fakes = player.getCards('s', function (c) { return c.hasGaintag(tag); });

                                    let realCards = [];
                                    game.players.concat(game.dead).forEach(function (p) {
                                        realCards.addArray(p.getCards('e'));

                                        // 同样在转换回真牌时过滤掉蓄谋牌，保持逻辑绝对一致
                                        var judgeCards = p.getCards('j').filter(function (c) {
                                            return (c.viewAs || c.name) !== "xumou_jsrg";
                                        });
                                        realCards.addArray(judgeCards);

                                        if (p !== player) {
                                            realCards.addArray(p.getCards('h').filter(function (c) { return c.hasGaintag('ms_tianshi_mingzhi'); }));
                                        }
                                    });
                                    if (ui.discardPile && ui.discardPile.childNodes.length > 0) {
                                        realCards.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length - 1]);
                                    }

                                    for (let i = 0; i < trigger.cards.length; i++) {
                                        const card = trigger.cards[i];
                                        if (fakes.includes(card)) {
                                            const realCard = realCards.find(function (r) { return r.cardid == card._cardid || r.cardid == card.cardid; });
                                            if (realCard) {
                                                trigger.cards[i] = realCard;
                                                if (trigger.card && trigger.card.cards) {
                                                    trigger.card.cards[i] = realCard;
                                                }
                                                game.log(player, '利用【天使】使用了明牌', realCard);
                                            }
                                        }
                                    }
                                },
                                sub: true
                            }
                        }
                    },

                    "ms_chuhui": {
                        audio: 2,
                        enable: "phaseUse",
                        mark: true,
                        marktext: "秽",
                        intro: {
                            content: function (storage, player) {
                                var suits = player.storage.ms_chuhui_suits || [];
                                if (suits.length === 0) return "本回合尚未消耗任何花色。";
                                var str = "<b>本回合已消耗花色：</b><br>";
                                var dict = {
                                    spade: '♠ 黑桃',
                                    heart: '<span style="color:red">♥ 红桃</span>',
                                    club: '♣ 梅花',
                                    diamond: '<span style="color:red">♦ 方块</span>'
                                };
                                suits.forEach(function (s) { str += dict[s] + "<br>"; });
                                return str;
                            }
                        },
                        onremove: function (player, skill) {
                            delete player.storage.ms_chuhui_suits;
                        },
                        filter: function (event, player) {
                            var usedSuits = player.storage.ms_chuhui_suits || [];
                            if (usedSuits.length >= 4) return false;

                            var hasValidSuit = function (card) {
                                var suit = get.suit(card);
                                return suit !== 'none' && !usedSuits.includes(suit);
                            };

                            var fakes = player.getCards('s', function (c) { return c.hasGaintag('ms_tianshi_tag'); });
                            var ownCards = player.getCards('he');
                            var allFaceUp = fakes.concat(ownCards);

                            if (!allFaceUp.some(hasValidSuit)) return false;

                            if (ui.cardPile.childNodes.length > 0) return true;
                            return game.hasPlayer(function (current) {
                                return current !== player && current.getCards('h').some(function (c) {
                                    return !c.hasGaintag('ms_tianshi_mingzhi');
                                });
                            });
                        },
                        content: function () {
                            "step 0"
                            var usedSuits = player.storage.ms_chuhui_suits || [];
                            player.chooseCard('hse', 1, '除秽：请选择一张【可见正面】的牌用于交换', function (card) {
                                var suit = get.suit(card);
                                if (suit === 'none' || usedSuits.includes(suit)) return false;
                                if (get.position(card) === 's' && !card.hasGaintag('ms_tianshi_tag')) return false;
                                return true;
                            }).set('ai', function (card) {
                                if (get.position(card) === 's') return 10;
                                return 7 - get.value(card);
                            });

                            "step 1"
                            if (result.bool) {
                                var fakeOrRealA = result.cards[0];
                                var realA = fakeOrRealA;

                                if (get.position(fakeOrRealA) === 's') {
                                    var allReal = [];
                                    game.players.concat(game.dead).forEach(function (p) {
                                        allReal.addArray(p.getCards('ej'));
                                        if (p !== player) {
                                            allReal.addArray(p.getCards('h').filter(function (c) { return c.hasGaintag('ms_tianshi_mingzhi'); }));
                                        }
                                    });
                                    if (ui.discardPile && ui.discardPile.childNodes.length > 0) {
                                        allReal.push(ui.discardPile.childNodes[ui.discardPile.childNodes.length - 1]);
                                    }
                                    var matched = allReal.find(function (r) { return r.cardid == fakeOrRealA._cardid || r.cardid == fakeOrRealA.cardid; });
                                    if (matched) realA = matched;
                                }

                                event.cardA = realA;

                                var controls = [];
                                if (ui.cardPile.childNodes.length > 0) controls.push('牌堆顶');
                                var hasHidden = game.hasPlayer(function (current) {
                                    return current !== player && current.getCards('h').some(function (c) { return !c.hasGaintag('ms_tianshi_mingzhi'); });
                                });
                                if (hasHidden) controls.push('其他角色');

                                if (controls.length === 1) {
                                    event.controlChoice = controls[0];
                                } else {
                                    player.chooseControl(controls).set('prompt', '请选择你要交换的暗置牌来源').set('ai', function () {
                                        return '其他角色';
                                    });
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            var choice = event.controlChoice || result.control;
                            if (choice === '牌堆顶') {
                                event.exchangeTarget = player;
                                event.cardB_is_drawpile = true;
                            } else if (choice === '其他角色') {
                                player.chooseTarget('除秽：请选择一名有暗置手牌的角色抽取其手牌', function (card, player, target) {
                                    return target !== player && target.getCards('h').some(function (c) { return !c.hasGaintag('ms_tianshi_mingzhi'); });
                                }).set('ai', function (target) {
                                    return -get.attitude(_status.event.player, target);
                                });
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (!event.cardB_is_drawpile && result.bool) {
                                event.exchangeTarget = result.targets[0];
                                player.choosePlayerCard(event.exchangeTarget, 'h', '抽取目标一张暗置手牌').set('filterButton', function (button) {
                                    return !button.link.hasGaintag('ms_tianshi_mingzhi');
                                });
                            } else if (!event.cardB_is_drawpile) {
                                event.finish();
                            }

                            "step 4"
                            if (event.exchangeTarget) {
                                if (event.cardB_is_drawpile) {
                                    event.cardB = get.cards(1)[0];
                                    game.log(player, '用', event.cardA, '与', '#y牌堆顶第一张牌', '进行了置换');
                                } else if (result.bool) {
                                    event.cardB = result.links[0];
                                    game.log(player, '用', event.cardA, '与', event.exchangeTarget, '的暗置手牌进行了置换');
                                } else {
                                    event.finish();
                                    return;
                                }

                                var cardA = event.cardA;
                                var cardB = event.cardB;
                                var target = event.exchangeTarget;
                                event.ownerA = get.owner(cardA);

                                // 精准记录它原本所在的区域
                                event.posA = cardA.parentNode ? get.position(cardA) : 'd';

                                var suit = get.suit(cardA);
                                if (!player.storage.ms_chuhui_suits) player.storage.ms_chuhui_suits = [];
                                if (!player.storage.ms_chuhui_suits.includes(suit)) {
                                    player.storage.ms_chuhui_suits.push(suit);
                                }
                                player.markSkill('ms_chuhui');

                                cardA.removeGaintag('ms_tianshi_mingzhi');
                                cardA.classList.remove('show');

                                if (event.ownerA) {
                                    event.ownerA.lose(cardA, ui.special);
                                }
                                if (!event.cardB_is_drawpile) {
                                    target.lose(cardB, ui.special);
                                }

                                // --- 暗牌 (B) 去向结算 ---
                                if (event.ownerA) {
                                    if (event.posA === 'e') {
                                        if (get.type(cardB) === 'equip') {
                                            event.ownerA.equip(cardB);
                                            game.log(event.ownerA, '将换来的', cardB, '作为装备置入装备区');
                                        } else {
                                            cardB.classList.remove('unseen');
                                            ui.discardPile.appendChild(cardB);
                                            game.log(cardB, '不符合装备类型，被直接置入弃牌堆');
                                        }
                                    } else if (event.posA === 'j') {
                                        var isDelay = get.type(cardB) === 'delay';
                                        var canAdd = isDelay && !event.ownerA.hasJudge(cardB.name);
                                        if (canAdd) {
                                            event.ownerA.addJudge(cardB);
                                            game.log(event.ownerA, '将换来的', cardB, '作为正常延时锦囊置入判定区');
                                        } else {
                                            // 【完全修复】：直接调用你现成的、能够被引擎解析的 xumou_jsrg
                                            event.ownerA.addJudge({ name: "xumou_jsrg" }, [cardB]);
                                            game.log(event.ownerA, '将换来的牌作为【蓄谋牌】扣置入判定区');
                                        }
                                    } else {
                                        event.ownerA.gain(cardB, 'gain2');
                                    }
                                } else {
                                    cardB.classList.remove('unseen');
                                    ui.discardPile.appendChild(cardB);
                                }

                                // --- 明牌 (A) 去向结算 ---
                                if (event.cardB_is_drawpile) {
                                    cardA.fix();
                                    ui.cardPile.insertBefore(cardA, ui.cardPile.firstChild);
                                    game.updateRoundNumber();
                                } else {
                                    target.gain(cardA, 'gain2');
                                }
                            }

                            "step 5"
                            if (event.exchangeTarget && !event.cardB_is_drawpile) {
                                var target = event.exchangeTarget;
                                var cardA = event.cardA;
                                if (target !== player && _status.currentPhase === player) {
                                    target.addGaintag([cardA], 'ms_tianshi_mingzhi');
                                }
                            }
                        },

                        group: ["ms_chuhui_clear"],
                        subSkill: {
                            clear: {
                                trigger: { player: "phaseUseEnd" },
                                forced: true,
                                silent: true,
                                content: function () {
                                    player.storage.ms_chuhui_suits = [];
                                    player.unmarkSkill('ms_chuhui');
                                }
                            }
                        }
                    },

                    "ms_poxing": {
                        audio: 2,
                        locked: true,
                        forced: true,
                        trigger: { player: "useCardAfter" },
                        filter: function (event, player) {
                            return true;
                        },
                        content: async function (event, trigger, player) {
                            // ---------------- [效果2：检测体力回复，刷新除秽] ----------------
                            // 抛弃脆弱的血量对比，直接检查本次出牌事件上是否被盖了“回血印章”
                            var healed = (trigger.ms_poxing_healed === true);

                            if (healed && player.storage.ms_chuhui_suits && player.storage.ms_chuhui_suits.length > 0) {
                                player.storage.ms_chuhui_suits = [];
                                player.unmarkSkill('ms_chuhui');
                                game.log(player, '触发【破性】，因回复体力刷新了【除秽】的花色记录！');
                                player.popup('除秽重置', 'green');
                            }

                            // ---------------- [效果1：检测同名同花色同点数，万象崩毁] ----------------
                            if (player.storage.ms_poxing_phase !== game.phaseNumber) {
                                player.storage.ms_poxing_phase = game.phaseNumber;
                                player.storage.ms_poxing_cards = [];
                            }

                            var card = trigger.card;
                            if (!card) return;

                            var name = card.name;
                            var suit = get.suit(card);
                            var number = get.number(card);
                            var signature = name + '|' + suit + '|' + number;

                            var isDuplicate = player.storage.ms_poxing_cards.includes(signature);
                            player.storage.ms_poxing_cards.push(signature);

                            if (!isDuplicate) return;

                            // 1. 搜集全场所有【可见正面牌】
                            var toDiscard = [];
                            toDiscard.addArray(player.getCards('he'));

                            game.players.concat(game.dead).forEach(function (p) {
                                if (p !== player) {
                                    toDiscard.addArray(p.getCards('e'));
                                    toDiscard.addArray(p.getCards('j').filter(function (c) {
                                        return (c.viewAs || c.name) !== "xumou_jsrg";
                                    }));
                                    toDiscard.addArray(p.getCards('h').filter(function (c) {
                                        return c.hasGaintag('ms_tianshi_mingzhi');
                                    }));
                                }
                            });

                            // 2. 剥离所有正面牌，强行塞入弃牌堆
                            if (toDiscard.length > 0) {
                                toDiscard.forEach(function (c) {
                                    var owner = get.owner(c);
                                    if (owner) {
                                        owner.lose(c, ui.special);
                                    }
                                    c.removeGaintag('ms_tianshi_mingzhi');
                                    c.classList.remove('show');
                                    ui.discardPile.appendChild(c);
                                });
                            }

                            // 3. 屏幕中央播放大字幕特效
                            var div = ui.create.div(ui.window);
                            div.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); z-index:1000; pointer-events:none; font-size:40px; font-family:"STXinwei","华文新魏",serif; color:#a020f0; text-shadow:0 0 10px #000, 0 0 20px #a020f0, 0 0 30px #a020f0; opacity:0; transition:all 0.5s ease-out; white-space:nowrap;';
                            div.innerHTML = '我愿化作风与大地<br>伴你身边';
                            setTimeout(function () { div.style.opacity = '1'; div.style.transform = 'translate(-50%, -60%)'; }, 50);
                            setTimeout(function () { div.style.opacity = '0'; div.style.transform = 'translate(-50%, -70%)'; }, 2000);
                            setTimeout(function () { div.delete(); }, 2500);

                            player.$skill('破性', null, 'purple');
                            game.log(player, '触发了【破性】，全场所有可见正面牌被摧毁！');

                            await game.delayx();
                            await game.washCard();

                            // 5. 抹除 trigger 物理牌记录，防残留
                            if (trigger.cards && trigger.cards.length > 0) {
                                trigger.cards.length = 0;
                            }

                            // 6. 物理扫荡
                            const leftover = Array.from(ui.discardPile.childNodes);
                            if (leftover.length > 0) {
                                leftover.forEach(function (c) {
                                    c.position = 'c';
                                    ui.cardPile.appendChild(c);
                                });
                                game.updateRoundNumber();
                            }
                        },

                        // 【全新重构的精准追踪系统】
                        group: ["ms_poxing_recordRecover"],
                        subSkill: {
                            recordRecover: {
                                trigger: { player: "recoverEnd" },
                                forced: true,
                                silent: true,
                                content: function () {
                                    // 顺藤摸瓜，找到是哪一次使用牌(useCard)引发了这个恢复事件(recover)
                                    var evt = event.getParent('useCard');
                                    // 如果找到了，且确实是玩家自己使用的牌
                                    if (evt && evt.player === player) {
                                        // 直接给那次出牌事件打上印章
                                        evt.ms_poxing_healed = true;
                                    }
                                }
                            }
                        }
                    },


                    //—————————————————————————————————————银子的技能————————————————————————————————————————————


                    "ms_huahai": {
                        name: "化害",
                        info: "游戏开始时，在每个人判定区内置入一张♠牌作为【闪电】；你的体力值与体力上限恒等于游戏中判定区内牌总数。",
                        trigger: { global: "gameStart" }, // 修改：提前到游戏刚开始时触发
                        forced: true,
                        group: ["ms_huahai_update"],
                        content: function () {
                            "step 0"
                            player.logSkill('ms_huahai');
                            event.players = game.filterPlayer();
                            "step 1"
                            if (event.players.length > 0) {
                                var target = event.players.shift();
                                var shandian = game.createCard({ name: 'shandian', suit: 'spade', number: 1 });
                                target.addJudge(shandian);
                                target.$draw(shandian);
                                game.log(target, '的判定区被放置了', shandian);
                                game.delay(0.2); // 加快了一点动画速度
                                event.redo();
                            } else {
                                // 【核心修复】：所有人闪电放置完毕后，打上初始化完成的标记
                                player.storage.ms_huahai_inited = true;

                                // 手动进行第一次体力同步
                                var count = 0;
                                game.countPlayer(function (current) {
                                    count += current.getCards('j').length;
                                });
                                player.maxHp = count;
                                player.hp = count;
                                player.update();
                            }
                        }
                    },
                    "ms_huahai_update": {
                        trigger: {
                            global: ["addJudgeAfter", "removeJudgeAfter", "loseAfter", "gainAfter", "cardsDiscardAfter", "dieAfter", "reviveAfter"]
                        },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            if (!player.storage.ms_huahai_inited) return false;

                            var count = 0;
                            game.countPlayer(function (current) {
                                count += current.getCards('j').length;
                            });

                            // 【核心修改】：向上遍历事件栈，补偿正在结算中（短暂离开判定区）的那1张判定牌
                            var evt = _status.event;
                            while (evt) {
                                if (evt.name === 'phaseJudge' && evt.card) {
                                    count++;
                                    break;
                                }
                                evt = evt.parent;
                            }

                            return player.hp !== count || player.maxHp !== count;
                        },
                        content: function () {
                            var count = 0;
                            game.countPlayer(function (current) {
                                count += current.getCards('j').length;
                            });

                            // 【核心修改】：同理，在正式结算体力时也加上这张悬空的判定牌
                            var evt = _status.event;
                            while (evt) {
                                if (evt.name === 'phaseJudge' && evt.card) {
                                    count++;
                                    break;
                                }
                                evt = evt.parent;
                            }

                            player.maxHp = count;
                            player.hp = count;
                            player.update();

                            // 体力上限降为0时，角色直接阵亡（无求桃阶段）
                            if (player.maxHp <= 0) {
                                player.die();
                            }
                        }
                    },


                    "ms_shanlao": {
                        name: "山姥",
                        info: "锁定技，一名角色的判定阶段结束时，你获得于此阶段内亮出的牌。",
                        trigger: { global: "phaseJudgeEnd" }, // 任意角色的判定阶段结束时触发
                        forced: true,
                        group: ["ms_shanlao_record", "ms_shanlao_clear"], // 绑定监听器与清理器
                        filter: function (event, player) {
                            if (!player.storage.ms_shanlao_cards || player.storage.ms_shanlao_cards.length === 0) return false;

                            // 【防抢夺机制】：过滤出那些目前还在弃牌堆(d)、处理区(s)或桌面(c)上的牌
                            // 如果牌已经被郭嘉【天妒】等技能拿走，位置会变成手牌(h)，则不会被山姥获得
                            var availableCards = player.storage.ms_shanlao_cards.filter(function (c) {
                                var pos = get.position(c);
                                return pos === 'd' || pos === 's' || pos === 'c';
                            });
                            return availableCards.length > 0;
                        },
                        content: function () {
                            var cards = player.storage.ms_shanlao_cards.filter(function (c) {
                                var pos = get.position(c);
                                return pos === 'd' || pos === 's' || pos === 'c';
                            });
                            if (cards.length > 0) {
                                player.logSkill('ms_shanlao');
                                player.gain(cards, 'gain2'); // 获得这些卡牌，并播放gain2对应的收牌动画
                            }
                        }
                    },

                    "ms_shanlao_record": {
                        // 隐藏监听器：覆盖判定区内所有可能导致卡牌产生的事件
                        // loseToDiscardpileAfter 完美捕捉蓄谋失败时的弃置动作
                        trigger: {
                            global: ["judgeAfter", "useCardAfter", "respondAfter", "discardAfter", "loseToDiscardpileAfter", "cardsDiscardAfter"]
                        },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            // 核心条件：确保当前发生的事情，一定是处于某个人的判定阶段内
                            var evt = _status.event;
                            var isJudgePhase = false;
                            while (evt) {
                                if (evt.name === 'phaseJudge') {
                                    isJudgePhase = true;
                                    break;
                                }
                                evt = evt.parent;
                            }
                            if (!isJudgePhase) return false;

                            // 针对判定牌特判
                            if (event.name === 'judge' && event.result && event.result.card) return true;
                            // 针对其他打出、使用、弃置的牌
                            if (event.cards && event.cards.length > 0) return true;

                            return false;
                        },
                        content: function () {
                            if (!player.storage.ms_shanlao_cards) player.storage.ms_shanlao_cards = [];
                            var cardsToAdd = [];

                            // 提取卡牌对象
                            if (trigger.name === 'judge') {
                                cardsToAdd.push(trigger.result.card);
                            } else if (trigger.cards) {
                                cardsToAdd = trigger.cards.slice();
                            }

                            // 去重并存入记录数组（防止同一张牌触发多个弃置事件被重复记录）
                            for (var i = 0; i < cardsToAdd.length; i++) {
                                if (!player.storage.ms_shanlao_cards.includes(cardsToAdd[i])) {
                                    player.storage.ms_shanlao_cards.push(cardsToAdd[i]);
                                }
                            }
                        }
                    },

                    "ms_shanlao_clear": {
                        // 隐藏清理器：在判定阶段刚开始和彻底结束后，严谨地清理缓存数组，防止脏数据累积
                        trigger: { global: ["phaseJudgeBegin", "phaseJudgeAfter"] },
                        forced: true,
                        silent: true,
                        content: function () {
                            delete player.storage.ms_shanlao_cards;
                        }
                    },


                    "ms_dengxian": {
                        name: "登仙",
                        info: "觉醒技。游戏中第一次出现3点及以上的伤害后，你失去【化害】，并获得技能【破晓】与【羽衣】。",
                        awakenSkill: true,
                        trigger: { global: "damageBegin" },
                        forced: true,
                        filter: function (event, player) {
                            return event.num >= 3 && !player.storage.ms_dengxian_awoken;
                        },
                        content: function () {
                            "step 0"
                            // 标记觉醒状态
                            player.storage.ms_dengxian_awoken = true;

                            // 1. 【核心修复】：使用底层 API 强制弹出武将原画并播放特效
                            // 'epic' 为紫金色闪烁特效，如果你更喜欢纯金色可以改为 'gold'
                            player.$skill('登仙', null, 'epic');

                            // 2. 屏幕中央播放大字幕特效
                            var div = ui.create.div(ui.window);
                            div.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); z-index:1000; pointer-events:none; font-size:120px; font-weight:bold; font-family:"STXingkai","华文行楷","STKaiti","楷体",serif; color:#ffffff; text-shadow:0 0 20px #ffaa00, 0 0 40px #ff0000; opacity:0; transition:all 0.8s ease-out; white-space:nowrap;';
                            div.innerHTML = '羽化登仙';

                            setTimeout(function () {
                                div.style.opacity = '1';
                                div.style.transform = 'translate(-50%, -60%)';
                            }, 50);

                            setTimeout(function () {
                                div.style.opacity = '0';
                                div.style.transform = 'translate(-50%, -70%)';
                            }, 2000);

                            setTimeout(function () {
                                div.delete();
                            }, 2500);


                            "step 1"
                            // 配合大字幕和粒子特效，延时 2.5 秒
                            game.delay(2.5);

                            "step 2"
                            // 3. 切换武将原画
                            var newImagePath = 'extension/xinghe/ms_yinzi_awaken.jpg';
                            // 4. 飞升粒子特效
                            var rect = player.getBoundingClientRect();
                            var particleCount = 100;

                            for (var i = 0; i < particleCount; i++) {
                                (function () {
                                    var particle = ui.create.div(ui.window);
                                    var size = Math.random() * 12 + 4;

                                    particle.style.cssText = 'position:absolute; width:' + size + 'px; height:' + size + 'px; background:#fff; box-shadow:0 0 10px #ffaa00, 0 0 20px #ff0000; border-radius:50%; z-index:999; pointer-events:none; opacity:0;';

                                    var startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width;
                                    var startY = rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height;
                                    particle.style.left = startX + 'px';
                                    particle.style.top = startY + 'px';

                                    var duration = 1.5 + Math.random() * 1.5;
                                    particle.style.transition = 'all ' + duration + 's cubic-bezier(0.25, 1, 0.5, 1)';

                                    setTimeout(function () {
                                        particle.style.opacity = Math.random() * 0.5 + 0.5;
                                        particle.style.top = (startY - 300 - Math.random() * 300) + 'px';
                                        particle.style.left = (startX + (Math.random() - 0.5) * 400) + 'px';
                                        particle.style.transform = 'scale(0.1)';
                                    }, 50);

                                    setTimeout(function () {
                                        particle.delete();
                                    }, duration * 1000 + 100);
                                })();
                            }


                            if (player.node.avatar) {
                                player.node.avatar.style.backgroundImage = 'url("' + newImagePath + '")';
                                player.node.avatar.style.backgroundSize = 'cover';
                                player.node.avatar.style.backgroundPosition = 'top center';
                            }

                            if (player.node.image) {
                                player.node.image.style.backgroundImage = 'url("' + newImagePath + '")';
                                player.node.image.style.backgroundSize = 'cover';
                                player.node.image.style.backgroundPosition = 'top center';
                            }

                            // 5. 技能更替
                            player.removeSkill('ms_huahai');
                            delete player.storage.ms_huahai_inited;
                            player.addSkill('ms_poxiao');
                            player.addSkill('ms_yuyi');

                            // 聊天框文本日志
                            game.log(player, '失去了技能【化害】，获得了技能【破晓】与【羽衣】');
                        }
                    },

                    // 破晓前置快照：全局监听任何卡牌的使用，只要目标包含银子，就在生效前拍下区域快照
                    "ms_poxiao_record": {
                        trigger: { global: "useCardBefore" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            // 条件：目标包含银子，且不是伤害类卡牌（杀、决斗、南蛮等）
                            return event.targets && event.targets.includes(player) && !get.tag(event.card, 'damage');
                        },
                        content: function () {
                            player.storage.ms_poxiao_count = {
                                h: player.countCards('h'),
                                e: player.countCards('e'),
                                j: player.countCards('j')
                            };
                        }
                    },

                    "ms_poxiao": {
                        name: "破晓",
                        info: "目标有你的非伤害类牌结算后，你可以选择一项：<br>1.你的【牌数未因此牌而变化的一个区域】的所有牌与一名角色的同种区域的牌交换；<br>2.你的【牌数有因此牌而变化的一个区域】的所有牌与一名角色的不同种区域的牌交换。",
                        trigger: { global: "useCardAfter" },
                        group: ["ms_poxiao_record"],
                        filter: function (event, player) {
                            // 条件：目标包含银子、非伤害牌、且成功记录了快照
                            return event.targets && event.targets.includes(player) && !get.tag(event.card, 'damage') && player.storage.ms_poxiao_count;
                        },
                        content: function () {
                            "step 0"
                            var oldCounts = player.storage.ms_poxiao_count;
                            var currentCounts = {
                                h: player.countCards('h'),
                                e: player.countCards('e'),
                                j: player.countCards('j')
                            };

                            var changed = [], unchanged = [];
                            var zones = ['h', 'e', 'j'];
                            for (var i = 0; i < zones.length; i++) {
                                if (currentCounts[zones[i]] !== oldCounts[zones[i]]) {
                                    changed.push(zones[i]);
                                } else {
                                    unchanged.push(zones[i]);
                                }
                            }

                            // 结算后立即清理快照，避免脏数据
                            delete player.storage.ms_poxiao_count;

                            event.changed = changed;
                            event.unchanged = unchanged;

                            var controls = [];
                            if (unchanged.length > 0) controls.push('未变区域换同种区域');
                            if (changed.length > 0) controls.push('已变区域换不同区域');
                            controls.push('cancel2');

                            player.chooseControl(controls).set('prompt', '破晓：请选择一项交换方式');

                            "step 1"
                            if (result.control === '未变区域换同种区域') {
                                event.opt = 1;
                                var list = [];
                                if (event.unchanged.includes('h')) list.push('手牌区');
                                if (event.unchanged.includes('e')) list.push('装备区');
                                if (event.unchanged.includes('j')) list.push('判定区');
                                player.chooseControl(list).set('prompt', '请选择你的一个【未改变】牌数的区域');
                            } else if (result.control === '已变区域换不同区域') {
                                event.opt = 2;
                                var list = [];
                                if (event.changed.includes('h')) list.push('手牌区');
                                if (event.changed.includes('e')) list.push('装备区');
                                if (event.changed.includes('j')) list.push('判定区');
                                player.chooseControl(list).set('prompt', '请选择你的一个【已改变】牌数的区域');
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control) {
                                var map = { '手牌区': 'h', '装备区': 'e', '判定区': 'j' };
                                event.myZone = map[result.control];
                                player.chooseTarget('破晓：请选择一名要交换牌的角色', function (card, player, target) {
                                    if (event.opt === 1) return target !== player; // 选项1：同种区域，不能选自己
                                    return true; // 选项2：不同种区域，可以选择自己
                                }).set('ai', function (target) {
                                    if (target === player) return 1;
                                    return -get.attitude(player, target);
                                });
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.target = result.targets[0];
                                if (event.opt === 1) {
                                    event.targetZone = event.myZone;
                                } else {
                                    var list = ['手牌区', '装备区', '判定区'];
                                    var map = { 'h': '手牌区', 'e': '装备区', 'j': '判定区' };
                                    list.remove(map[event.myZone]);

                                    // 如果选了自己，文案提示做一下优化
                                    var promptStr = event.target === player ? '请选择你的另一个【不同种】区域' : '请选择' + get.translation(event.target) + '的一个【不同种】区域进行交换';
                                    player.chooseControl(list).set('prompt', promptStr);
                                }
                            } else {
                                event.finish();
                            }

                            "step 4"
                            if (event.opt === 2 && result.control) {
                                var map = { '手牌区': 'h', '装备区': 'e', '判定区': 'j' };
                                event.targetZone = map[result.control];
                            }

                            "step 5"
                            player.logSkill('ms_poxiao', event.target);

                            var cardsA = player.getCards(event.myZone).slice();
                            var cardsB = event.target.getCards(event.targetZone).slice();

                            // 剥离卡牌
                            if (cardsA.length > 0) player.lose(cardsA, ui.special, 'to_special');
                            if (cardsB.length > 0) event.target.lose(cardsB, ui.special, 'to_special');

                            event.cardsA = cardsA;
                            event.cardsB = cardsB;

                            "step 6"
                            var toDiscard = [];
                            var handleZone = function (char, zone, cards) {
                                if (!cards || !cards.length) return;

                                if (zone === 'h') {
                                    char.gain(cards, 'gain2');

                                } else if (zone === 'e') {
                                    var equippedSubtypes = char.getCards('e').map(function (c) { return get.subtype(c); });
                                    for (var i = 0; i < cards.length; i++) {
                                        var card = cards[i];
                                        if (get.type(card) === 'equip') {
                                            char.equip(card);
                                            equippedSubtypes.push(get.subtype(card));
                                        } else if (char.hasSkill('ms_yuyi')) {
                                            var allSubtypes = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
                                            var emptySubtypes = allSubtypes.filter(function (sub) { return !equippedSubtypes.includes(sub); });

                                            if (emptySubtypes.length > 0) {
                                                var randomSubtype = emptySubtypes.randomGet();
                                                var pool = [];

                                                // 【修复1】从当前环境的牌堆 (lib.inpile) 中筛选存在的装备牌
                                                if (lib.inpile) {
                                                    for (var j = 0; j < lib.inpile.length; j++) {
                                                        var equipName = lib.inpile[j];
                                                        if (lib.card[equipName] && lib.card[equipName].type === 'equip' && lib.card[equipName].subtype === randomSubtype) {
                                                            pool.push(equipName);
                                                        }
                                                    }
                                                }

                                                // 防呆设计：如果当前模式牌堆太特殊，压根没有这类装备，就去库里找一个兜底，防止报错
                                                if (pool.length === 0) {
                                                    for (var name in lib.card) {
                                                        if (lib.card[name].type === 'equip' && lib.card[name].subtype === randomSubtype) {
                                                            pool.push(name);
                                                        }
                                                    }
                                                }

                                                if (pool.length > 0) {
                                                    var equipNameToCreate = pool.randomGet();
                                                    var newEquip = game.createCard(equipNameToCreate);
                                                    char.equip(newEquip);
                                                    game.log(char, '触发【羽衣】，将', card, '变为了当前牌堆中的', newEquip);
                                                }
                                                toDiscard.push(card);
                                                equippedSubtypes.push(randomSubtype);
                                            } else {
                                                toDiscard.push(card);
                                            }
                                        } else {
                                            toDiscard.push(card);
                                        }
                                    }

                                } else if (zone === 'j') {
                                    for (var i = 0; i < cards.length; i++) {
                                        var card = cards[i];
                                        if (get.type(card) === 'delay' && !char.hasJudge(card.name)) {
                                            char.addJudge(card);
                                        } else {
                                            char.addJudge({ name: 'xumou_jsrg' }, [card]);
                                            game.log(char, '将', card, '作为【蓄谋】牌置入判定区');
                                        }
                                    }
                                }
                            };

                            handleZone(event.target, event.targetZone, event.cardsA);
                            handleZone(player, event.myZone, event.cardsB);

                            if (toDiscard.length > 0) {
                                game.cardsDiscard(toDiscard);
                                game.log(toDiscard, '因无法置入对应区域被弃置');
                            }
                        }
                    },

                    "ms_yuyi": {
                        name: "羽衣",
                        info: "你使用蓄谋牌没有次数限制，且你可以自由选择判定区内【蓄谋】牌的结算顺序；当非装备牌进入你的装备区时，若有空缺，将其随机变为当前牌堆中的对应空缺装备。",
                        // 新增了 ms_yuyi_arrange 绑定
                        group: ["ms_yuyi_xumou_clear", "ms_yuyi_arrange"]
                    },

                    "ms_yuyi_xumou_clear": {
                        // 【核心修复】：将时机改为 Before，在下一张蓄谋牌准备弹出询问窗口前，精准抹除上一张留下的限制印记
                        trigger: { player: ["chooseUseTargetBefore", "chooseToUseBefore", "phaseJudgeAfter"] },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return player.hasSkill('xumou_jsrg_temp');
                        },
                        content: function () {
                            player.removeSkill('xumou_jsrg_temp');
                            delete player.storage.xumou_jsrg_temp;
                        }
                    },

                    // 【新增技能】：在判定阶段开始时，拦截并重新排列蓄谋牌
                    "ms_yuyi_arrange": {
                        trigger: { player: "phaseJudgeBegin" },
                        forced: true,
                        filter: function (event, player) {
                            // 只有当判定区里的蓄谋牌数量 >= 2 张时，才需要排序
                            var xumou = player.getCards('j', function (card) {
                                return card.name === 'xumou_jsrg' || card.viewAs === 'xumou_jsrg' || card.storage.xumou_jsrg;
                            });
                            return xumou.length > 1;
                        },
                        content: function () {
                            "step 0"
                            // 抓取当前所有的蓄谋牌
                            event.xumouCards = player.getCards('j', function (card) {
                                return card.name === 'xumou_jsrg' || card.viewAs === 'xumou_jsrg' || card.storage.xumou_jsrg;
                            });
                            event.orderedCards = []; // 用来存放玩家排好序的卡牌

                            "step 1"
                            if (event.xumouCards.length > 0) {
                                var promptStr = '羽衣：请选择第 ' + (event.orderedCards.length + 1) + ' 张结算的【蓄谋】牌';
                                // 弹窗让玩家选择
                                player.chooseButton([promptStr, event.xumouCards]).set('ai', function (button) {
                                    return Math.random(); // AI 随机挑选顺序
                                });
                            } else {
                                event.goto(3);
                            }

                            "step 2"
                            if (result.bool && result.links && result.links.length > 0) {
                                var chosenCard = result.links[0];
                                event.orderedCards.push(chosenCard); // 加入已排序队列
                                event.xumouCards.remove(chosenCard); // 从待选队列中移除

                                // 如果只剩最后一张了，就没必要选了，自动放入队尾
                                if (event.xumouCards.length === 1) {
                                    event.orderedCards.push(event.xumouCards[0]);
                                    event.xumouCards = [];
                                }
                                event.goto(1); // 循环回到 step 1，继续选下一张
                            } else {
                                // 如果玩家中途点击了取消，剩下的牌保持原本的相对顺序直接追加到队尾
                                event.orderedCards = event.orderedCards.concat(event.xumouCards);
                                event.xumouCards = [];
                                event.goto(1);
                            }

                            "step 3"
                            // === 核心黑科技：底层 DOM 静默换位 ===
                            player.logSkill('ms_yuyi');
                            game.log(player, '重新排列了判定区内', '#y【蓄谋】', '的结算顺序');

                            var allJudges = player.getCards('j');
                            var xumouIndices = [];

                            // 1. 记录所有蓄谋牌在当前判定区中的索引位置（比如第0个、第2个）
                            for (var i = 0; i < allJudges.length; i++) {
                                if (allJudges[i].name === 'xumou_jsrg' || allJudges[i].viewAs === 'xumou_jsrg' || allJudges[i].storage.xumou_jsrg) {
                                    xumouIndices.push(i);
                                }
                            }

                            var newJudges = allJudges.slice();

                            // 2. 无名杀是“最后塞入的牌最先结算”(索引越大的越先结算)
                            // 所以我们把玩家选择的“最先结算(第1张)”放在最大的索引位置上
                            for (var i = 0; i < event.orderedCards.length; i++) {
                                var targetIndex = xumouIndices.shift();
                                newJudges[targetIndex] = event.orderedCards[i];
                            }

                            // 3. 静默将卡牌节点以新顺序重新贴回判定区 DOM，不触发任何获得/失去卡牌的事件
                            for (var i = 0; i < newJudges.length; i++) {
                                player.node.judges.appendChild(newJudges[i]);
                            }

                            // 刷新UI显示
                            player.update();
                        }
                    },


                    //————————————————————————————————————————————月社妃————————————————————————————————————————————————————

                    "ms_mengyan": {
                        zhuanhuanji: true,
                        mark: true,
                        intro: {
                            content: function (storage, player) {
                                if (player.storage.ms_mengyan_state) {
                                    return "当前为<span class='text' style='color:#7700ff'>阴</span>：你使用伤害类牌指定目标时，可以为此牌追加至多两个无距离限制的目标。";
                                } else {
                                    return "当前为<span class='text' style='color:#ffaa00'>阳</span>：你成为即时牌的目标时，可以为此牌追加至多两个无距离限制的目标。";
                                }
                            }
                        },
                        oninit: function (player) {
                            if (player.storage.ms_mengyan_state === undefined) {
                                player.storage.ms_mengyan_state = false;
                            }
                        },
                        group: ["ms_mengyan_yang", "ms_mengyan_yin"]
                    },

                    "ms_mengyan_yang": {
                        trigger: { target: "useCardToTargeted" },
                        filter: function (event, player) {
                            if (player.storage.ms_mengyan_state) return false;
                            if (!event.card) return false;

                            var type = get.type(event.card);
                            if (type !== 'basic' && type !== 'trick') return false;

                            var evt = event.getParent();
                            if (!evt || !evt.targets) return false;

                            // 如果场上已经没有可以追加的目标（比如南蛮入侵已经锁定了所有人），则不弹出提示
                            var allPlayers = game.countPlayer(function (current) {
                                return !evt.targets.includes(current);
                            });
                            return allPlayers > 0;
                        },
                        content: function () {
                            "step 0"
                            var prompt = '梦魇：是否为【' + get.translation(trigger.card) + '】追加至多两个无距离限制的目标？';

                            // 【核心修改】：将 [1, Infinity] 改为 [1, 2]
                            player.chooseTarget(prompt, [1, 2], function (card, player, target) {
                                var evt = _status.event.getTrigger().getParent();
                                return !evt.targets.includes(target);
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                player.logSkill('ms_mengyan');
                                var evt = trigger.getParent();

                                // 将选择的玩家追加进原卡牌的目标结算队列中
                                evt.targets = evt.targets.concat(result.targets);
                                game.log(player, '为', trigger.card, '追加了目标', result.targets);

                                // 翻转状态
                                player.storage.ms_mengyan_state = true;
                                player.markSkill('ms_mengyan');
                            }
                        }
                    },

                    "ms_mengyan_yin": {
                        trigger: { player: "useCard" },
                        filter: function (event, player) {
                            if (!player.storage.ms_mengyan_state) return false;
                            if (!get.tag(event.card, 'damage')) return false; // 必须是伤害类牌
                            if (!event.targets) return false;

                            var allPlayers = game.countPlayer(function (current) {
                                return !event.targets.includes(current);
                            });
                            return allPlayers > 0;
                        },
                        content: function () {
                            "step 0"
                            var prompt = '梦魇：是否为【' + get.translation(trigger.card) + '】追加至多两个无距离限制的目标？';

                            // 【核心修改】：将 [1, Infinity] 改为 [1, 2]
                            player.chooseTarget(prompt, [1, 2], function (card, player, target) {
                                var evt = _status.event.getTrigger();
                                return !evt.targets.includes(target);
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                player.logSkill('ms_mengyan');

                                trigger.targets = trigger.targets.concat(result.targets);
                                game.log(player, '为', trigger.card, '追加了目标', result.targets);

                                // 翻转状态
                                player.storage.ms_mengyan_state = false;
                                player.markSkill('ms_mengyan');
                            }
                        }
                    },

                    "ms_edu": {
                        trigger: { global: "useCardToTargeted" },
                        priority: -10, // 优先级设为负数，确保在【梦魇】（默认优先级）执行完并加了目标后才触发
                        direct: true,
                        filter: function (event, player) {
                            var evt = event.getParent();
                            // 过滤1：保证一次多目标牌只询问一次
                            if (evt.ms_edu_checked) return false;
                            // 过滤2：必须是多目标牌（原生多目标，或被梦魇改造后的）
                            if (evt.targets.length <= 1) return false;
                            // 过滤3：不能改业火本身，防死循环
                            if (evt.card.name === 'yehuo') return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            var evt = trigger.getParent();
                            evt.ms_edu_checked = true; // 打上标记，后续目标结算时不再弹窗

                            var promptStr = '恶妒：是否将【' + get.translation(evt.card) + '】改为同属性的【业火】？';
                            player.chooseBool(promptStr).set('ai', function () {
                                return true; // AI 会选择发动
                            });

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_edu');
                                var evt = trigger.getParent();

                                // 抓取原卡牌的属性（适用于火杀、雷杀）
                                var nature = get.nature(evt.card);

                                // 【核心修复】：针对底层不带 nature 属性的火攻和闪电，进行强制转换
                                if (evt.card.name === 'huogong') nature = 'fire';
                                if (evt.card.name === 'shandian') nature = 'thunder';

                                // 创建并生成【业火】
                                var yehuo = game.createCard({ name: 'yehuo', nature: nature });
                                var oldCard = evt.card;

                                // 核心操作：将事件流中的原卡牌在半空中直接替换为业火
                                evt.card = yehuo;
                                trigger.card = yehuo;

                                game.log(player, '将', oldCard, '转化为了', yehuo);
                            }
                        }
                    },



                    "ms_yeyan": {
                        awakenSkill: true,
                        trigger: { player: "damageEnd" }, // 【核心修改1】：触发时机改为受到伤害后
                        forced: true,
                        group: ["ms_yeyan_init", "ms_yeyan_restore"],
                        filter: function (event, player) {
                            // 【核心修改2】：必须是火属性伤害，且未觉醒
                            return event.nature === 'fire' && !player.storage.ms_yeyan_awoken;
                        },
                        content: function () {
                            "step 0"
                            // === 觉醒特效与替换牌堆 ===
                            // ----------------- ↓↓↓ 插入的转场图片代码 ↓↓↓ -----------------
                            var splash = ui.create.div();
                            // 设置图片样式：全屏覆盖、层级最高、初始透明度为0、设置渐变动画
                            splash.style.cssText = 'position:absolute; width:100%; height:100%; left:0; top:0; z-index:100; opacity:0; transition:opacity 0.8s; pointer-events:none; background-image:url("extension/xinghe/ms_Kisaki_awake.jpg"); background-size:cover; background-position:center;';
                            ui.window.appendChild(splash);

                            // 强制刷新UI，触发淡入效果
                            ui.refresh(splash);
                            splash.style.opacity = '1';

                            // 暂停游戏进程 2 秒钟，让玩家看完转场
                            game.delayx(2);

                            // 定时器：2秒后开始淡出，淡出完成后移除图片节点
                            setTimeout(function () {
                                splash.style.opacity = '0';
                                setTimeout(function () {
                                    splash.remove();
                                }, 800); // 这里的 800 是等待淡出动画结束的时间 (0.8秒)
                            }, 2000); // 这里的 2000 是图片停留时间 (2秒)
                            // ----------------- ↑↑↑ 插入的转场图片代码 ↑↑↑ -----------------
                            player.storage.ms_yeyan_awoken = true;
                            player.awakenSkill('ms_yeyan');
                            player.$skill('业炎', null, 'epic');
                            game.log(player, '受到火焰伤害，触发了', '#r【业炎】', '觉醒！');
                            // 1. 保存当前真实的牌堆节点
                            game.ms_yeyan_savedPile = Array.from(ui.cardPile.childNodes);
                            ui.cardPile.innerHTML = '';

                            // 2. 捏造三十张地狱级烈火牌堆
                            var cards = [];
                            for (var i = 0; i < 10; i++) {
                                cards.push(game.createCard({ name: 'sha', nature: 'fire' }));
                                cards.push(game.createCard({ name: 'tiesuo' }));
                                cards.push(game.createCard({ name: 'huogong' }));
                            }
                            cards.randomSort();

                            // 3. 将新牌放入牌堆
                            for (var i = 0; i < cards.length; i++) {
                                ui.cardPile.appendChild(cards[i]);
                            }
                            game.updateRoundNumber();
                            game.log(player, '将游戏原牌堆移除，捏造了特殊的', '#r【烈火牌堆】');

                            "step 1"
                            // === 移动装备系统 ===
                            var equips = player.getCards('e');
                            if (equips.length > 0) {
                                player.chooseCardTarget({
                                    prompt: '业炎：请先点击你要移动的装备，再点击目标角色',
                                    prompt2: '（如果不想移动，请直接点击“取消”）',
                                    position: 'e',
                                    selectCard: 1,
                                    selectTarget: 1,
                                    filterCard: function (card, player) {
                                        return get.position(card) === 'e';
                                    },
                                    filterTarget: function (card, player, target) {
                                        if (player === target) return false;

                                        if (!card) {
                                            var myEquips = player.getCards('e');
                                            for (var i = 0; i < myEquips.length; i++) {
                                                if (target.isEmpty(get.subtype(myEquips[i]))) return true;
                                            }
                                            return false;
                                        }
                                        return target.isEmpty(get.subtype(card));
                                    }
                                }).set('ai', function (card, player, target) {
                                    return 0;
                                });
                            } else {
                                // 【核心修改3】：如果没有装备了，直接跳到 step 3 去摸牌，而不是结束
                                event.goto(3);
                            }

                            "step 2"
                            if (result.bool && result.targets && result.targets.length > 0 && result.cards && result.cards.length > 0) {
                                var target = result.targets[0];
                                var card = result.cards[0];

                                player.lose(card, ui.special, 'to_special');
                                target.equip(card);
                                target.$gain2(card);
                                game.log(player, '将', card, '移动到了', target, '的装备区');

                                event.goto(1); // 移动完继续循环选
                            } else {
                                // 【核心修改4】：如果玩家主动点击了“取消”移动装备，也跳到 step 3 去摸牌
                                event.goto(3);
                            }

                            "step 3"
                            // 【新增】：摸牌结算
                            player.draw(3);
                            game.log(player, '触发【业炎】附加效果，摸了三张牌');
                        }
                    },

                    // 【全新拆分的隐藏子技能】：专门负责开局改装备栏和穿藤甲
                    "ms_yeyan_init": {
                        trigger: {
                            global: "phaseBefore",
                            player: "enterGame"
                        },
                        forced: true,
                        filter: function (event, player) {
                            // 严格参考官方代码的判断逻辑，确保只在游戏第一瞬间触发一次
                            return (event.name !== "phase" || game.phaseNumber === 0) && !player.storage.ms_yeyan_inited;
                        },
                        content: function () {
                            "step 0"
                            player.storage.ms_yeyan_inited = true;

                            // 1. 调用最新官方 API 修改槽位
                            player.disableEquip(5); // 废除宝具栏
                            player.expandEquip(2);  // 额外增加一个防具栏

                            game.log(player, '废除了宝具栏，并获得了额外的防具栏');
                            player.logSkill('ms_yeyan');

                            // 2. 翻找两件藤甲
                            var tengjias = [];
                            var pile = ui.cardPile.childNodes;
                            for (var i = pile.length - 1; i >= 0; i--) {
                                if (pile[i].name === 'tengjia') {
                                    tengjias.push(pile[i]);
                                    if (tengjias.length >= 2) break;
                                }
                            }
                            for (var i = 0; i < tengjias.length; i++) {
                                tengjias[i].remove();
                            }
                            while (tengjias.length < 2) {
                                tengjias.push(game.createCard({ name: 'tengjia' }));
                            }

                            event.tengjias = tengjias;
                            event.currentIndex = 0;

                            "step 1"
                            // 3. 循环强行穿戴藤甲
                            if (event.currentIndex < event.tengjias.length) {
                                var currentCard = event.tengjias[event.currentIndex];
                                player.$gain2(currentCard);
                                player.equip(currentCard);
                                game.log(player, '装备了', currentCard);

                                event.currentIndex++;
                                event.redo();
                            }
                        }
                    },

                    // 隐藏子技能：负责烈火牌堆耗尽时复原原牌堆
                    "ms_yeyan_restore": {
                        trigger: { global: "washCardBefore" },
                        forced: true,
                        silent: true,
                        filter: function (event, player) {
                            return game.ms_yeyan_savedPile && game.ms_yeyan_savedPile.length > 0;
                        },
                        content: function () {
                            var pile = game.ms_yeyan_savedPile;
                            pile.randomSort();
                            for (var i = 0; i < pile.length; i++) {
                                ui.cardPile.appendChild(pile[i]);
                            }
                            delete game.ms_yeyan_savedPile;
                            game.updateRoundNumber();
                            game.log('【业炎】的捏造牌堆已耗尽，原牌堆已自动复原');

                            trigger.cancel();
                        }
                    }





                },


                translate: {
                    // --- 技能翻译 ---

                    ms_lanyu: "婪欲",
                    ms_lanyu_info: "<b>锁定技</b>，连续限技能数次，当你获得牌后，你摸一张牌。然后若你的手牌已凑齐四种花色，你选择一项：<br>1.失去一点体力；<br>2.（此选项每回合限一次）将此技能交给一名其他角色。",
                    ms_lanai: "婪爱",
                    ms_lanai_info: "<b>锁定技</b>，当你使用的牌结算后，若你的手牌中有与此牌同花色的牌，你选择一项：<br>1.失去一点体力；<br>2.（此选项每回合限一次）将此技能交给一名其他角色；<br>3.展示并使用一张本回合你未展示过的花色的牌。",
                    ms_qiming: "启明",
                    ms_qiming_info: "出牌阶段限一次，你可以交给一名其他角色任意张手牌，然后你摸等量的牌。",

                    ms_gongpo: "弓破",
                    ms_gongpo_info: "牌堆底X张牌于你可见（X为你的体力值）。<br>当你使用牌指定目标后，或其它角色使用牌指定你为目标后，你可以用其中一张非抵消的可见牌与其替换之；<br>若涉及非即时牌，此牌是你使用的，或是替换用的，则你重新指定一个合法目标。",
                    ms_gongpo_bg: "弓", // 头像上可见方框内部显示的文字
                    ms_qidao: "祈蹈",
                    ms_qidao_info: "<b>觉醒技</b>，准备阶段开始时，若你通过“弓破”可见的牌牌名均相同，你回复1点体力，然后获得技能【降身】。",
                    ms_jiangshen: "降身",
                    ms_jiangshen_info: "每回合每种花色限一次。准备阶段开始时、结束阶段开始时，或你发动【弓破】后：<br>你可以用一种花色的所有手牌，置换【弓破】可见牌。",
                    ms_jiangshen_bg: "降",

                    ms_zuoxiang: "着相",
                    ms_zuoxiang_info: "<b>锁定技</b>，目标包含你的牌结算完成后：<br>1. 若此牌对你造成过伤害，你获得此牌；<br>2. 若未对你造成伤害，你摸一张牌，若下一张被使用的牌是即时牌，你可为其追加一名无限制的目标。",
                    ms_zuoxiang_bg: "相",
                    ms_zuoxiang_add: "着相·追加",
                    ms_zuoxiang_dmg: "着相·监听",
                    ms_zuoxiang_clear: "着相·重置",
                    ms_zhiming: "知命",
                    ms_zhiming_info: "出牌阶段限一次，你可以弃置一名角色一张牌并令其观看牌堆顶X张牌（X为你场上牌数总和），然后其必须使用其中一张牌指定你为目标。<br>若其无法使用任何牌，此技能本回合失效。",

                    ms_binhun: "秉昏",
                    ms_binhun_info: "<b>锁定技</b>，你使用的牌结算后，你弃置一种花色的所有手牌。",
                    ms_binhun_bg: "昏",
                    ms_tuien: "推恩",
                    ms_tuien_info: "<b>锁定技</b>，连续限体力值次，当你失去手牌后，你可以获得一名其它角色一张牌，然后你将你刚刚失去的手牌交给他。",
                    ms_tuien_bg: "恩",
                    ms_tuien_refresh: "推恩·刷新",
                    ms_tuien_lose: "推恩·赠予",
                    ms_tuien_clear: "推恩·重置",
                    ms_luangang: "乱纲",
                    ms_luangang_info: "<b>锁定技</b>，当你不因为本技能执行以下一项时，你立刻选择执行另一项：<br>1. 使用一张【杀】（若无合法杀或目标不可选）；<br>2. 获得其它角色一张牌（若他人均无牌不可选）；<br>3. 摸一张牌；<br>4. 弃置任意角色一张牌。",
                    ms_luangang_bg: "纲",

                    ms_dianlu: "点路",
                    ms_dianlu_info: "出牌阶段，若本回合上一张被使用的牌不是转化牌，则你可以将一张手牌或装备牌当不要求目标有武器【借刀杀人】使用；<br>若对方不出杀，你令上一张结算完的转化牌的所有目标角色，依次对其造成1点伤害。",
                    ms_dianlu_bg: "路",
                    ms_dianlu_monitor: "点路·监控",
                    ms_dianlu_clear: "点路·清空",
                    ms_fengliu: "风流",
                    ms_fengliu_info: "当目标包含你的非转化牌结算完成后，你可以将一张手牌或装备牌当【桃园结义】使用。",
                    ms_fengliu_bg: "流",
                    ms_fengliu_viewas: "风流",


                    ms_gouzao: "构造",
                    ms_gouzao_info: "游戏开始时，你将牌堆中每个非响应即时牌名随机各扣一张置于角色牌上。<br>当你使用或他人对你使用牌时，你可以弃置角色牌上一张同名牌，重新构造此牌的使用规则:<br>选目标法则、伤害增减、结算次数、响应基本牌、使用时机，持续至本轮结束。",
                    ms_gouzao_bg: "构",
                    ms_gouzao_init: "构造·初始化",
                    ms_gouzao_dmg: "构造·全局伤害",
                    ms_gouzao_repeat: "构造·全局多结",
                    ms_gouzao_replace_basic: "构造·全局牌名",
                    ms_gouzao_timing_trigger: "构造·全局时机",
                    ms_gouzao_mod: "构造·时机锁死",
                    ms_gouzao_clear: "构造·轮次清理",
                    ms_dedao: "得道",
                    ms_dedao_info: "你每累积使用四种牌名不同的牌后，可以摸四张牌。",
                    ms_dedao_bg: "道",
                    ms_manman: "漫漫",
                    ms_manman_info: "<b>限定技</b>，永无止尽的八月~~<br>每轮开始时，你可以令游戏中只剩下仅能使用一张牌的出牌阶段，且未在出牌阶段使用牌的角色会失去一点体力。<br>当有角色进入濒死状态后，八月终结，你的回合开始。",
                    ms_manman_bg: "漫",
                    ms_manman_skip: "漫漫·阶段剔除",
                    ms_manman_monitor: "漫漫·出牌限一",
                    ms_manman_penalty: "漫漫·白板惩罚",
                    ms_manman_dying: "漫漫·濒死破局",

                    "ms_zhishi": "治世",
                    "ms_zhishi_info": "当一名角色使用【杀】指定目标时，你可以取消之。<br>然后若有可能，该角色对自己和你使用牌名最长的一张合法卡牌；<br>否则，展示牌堆顶的五张牌，由牌堆依次对该【杀】的原目标使用其中的所有伤害类卡牌。",

                    "ms_jiuku": "救苦",
                    "ms_jiuku_info": "当你使用牌指定目标后，若你没有“情”，则你可以选择一项：<br>1.交给其一张牌，此牌称为“情”；<br>2.将手牌调整至已损失体力值。",
                    "ms_nichang": "霓裳",
                    "ms_nichang_info": "出牌阶段，你可以选择一名角色。<br>然后所有持有“情”牌的角色依次将两张牌当一张【杀】对其使用。",

                    "ms_longzhan": "龙瞻",
                    "ms_longzhan_info": "你可以重铸一张非基本牌，视为你使用或打出一张【杀】或【闪】。",
                    "ms_longzhan_sha": "龙瞻",
                    "ms_longzhan_shan": "龙瞻",
                    "ms_longzhan_draw": "龙瞻",
                    "ms_konghe": "恐赫",
                    "ms_konghe_info": "<b>锁定技</b>，你使用的牌结算后，此牌目标依次可以对你发动【黩武】。<br>若你未因此受到伤害，你对一名角色造成1点伤害。",
                    "ms_zaodong": "躁动",
                    "ms_zaodong_info": "每回合你首次受到伤害后，你可以选择一名手牌数不大于你的其它角色，其依次将所有的红色牌当【杀】使用。",
                    "ms_zaodong_backup": "躁动",

                    "ms_tianshi": "天使",
                    "ms_tianshi_info": "<b>锁定技</b>，你可以使用游戏中所有可见正面的牌；<br>其他角色于你回合内获得牌后，须明置这些牌。",
                    "ms_tianshi_reveal": "天使·明置",
                    "ms_tianshi_sync": "天使·同步",
                    "ms_tianshi_use": "天使·截获",
                    "ms_tianshi_tag": "天使",
                    "ms_tianshi_mingzhi": "明置",
                    "ms_chuhui": "除秽",
                    "ms_xumou": "蓄谋",
                    "ms_chuhui_info": "出牌阶段每种花色限一次，你可以用一张你可见正面的牌，去交换一张你可见背面的牌。",
                    "ms_poxing": "破性",
                    "ms_poxing_info": "<b>锁定技</b>，你使用的牌结算后：<br>①若你回复了体力，刷新【除秽】；<br>②若此牌本回合内你已经使用过，则弃置所有可见正面牌，并洗牌。",

                    "ms_huahai": "化害",
                    "ms_huahai_info": "游戏开始时，在每个人判定区内置入一张♠牌作为【闪电】；你的体力值与体力上限恒等于游戏中判定区内牌总数。",
                    "ms_dengxian": "登仙",
                    "ms_dengxian_info": "<b>觉醒技</b>，游戏中第一次出现3点及以上的伤害时，你失去【化害】，获得【破晓】与【羽衣】。",
                    "ms_poxiao": "破晓",
                    "ms_poxiao_info": "目标有你的非伤害类牌结算后，你可以选择一项：<br>1.你的【牌数未因此牌而变化的一个区域】的所有牌与一名角色的同种区域的牌交换；<br>2.你的【牌数有因此牌而变化的一个区域】的所有牌与一名角色的不同种区域的牌交换。",
                    "ms_yuyi": "羽衣",
                    "ms_yuyi_info": "你使用蓄谋牌没有次数限制，且你可以自由选择判定区内【蓄谋】牌的结算顺序；<br>当非装备牌进入你的装备区时，若有空缺，将其随机变为对应空缺装备。",
                    "ms_shanlao": "山姥",
                    "ms_shanlao_info": "<b>锁定技</b>，一名角色的判定阶段结束时，你获得于此阶段内亮出的牌。",

                    "ms_mengyan": "梦魇",
                    "ms_mengyan_info": "<b>转换技</b>。①.你被即时牌指定时 ②.你使用伤害类牌指定目标时：<br>可以为此牌追加至多两个无距离限制的目标。",
                    "ms_mengyan_yang": "梦魇·阳",
                    "ms_mengyan_yin": "梦魇·阴",
                    "ms_edu": "恶妒",
                    "ms_edu_info": "当多目标牌指定目标后，你可以将此牌改为同属性的【业火】。",
                    "ms_yeyan": "业炎",
                    "ms_yeyan_info": "<b>使命技</b>，游戏开始时，你将宝具栏改为防具栏并使用牌堆中的两张【藤甲】；<br>成功：你受到火焰伤害，将原牌堆<b>替换</b>为由各10张【火杀】、【铁索连环】、【火攻】组成的临时牌堆。<br>然后你可以移动你的装备牌并摸三张牌。",

                }
            }
        },

        // ================= 【资源预加载层】 =================
        files: {
            character: [
                "ms_cangnv",
                "ms_harukairubo",
                "ms_rindou",
                "ms_licia",
                "ms_huiliu",
                "ms_shenyuantuo",
                "ms_baihuangnv",
                "ms_canglanxing",
                "ms_rena",
                "ms_Eustia",
                "ms_yinzi",
                "ms_Kisaki",
            ],
            card: [],
            skill: []
        }
    };
});