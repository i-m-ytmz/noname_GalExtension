'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "萌定天下",
        content: function (config, pack) { },
        precontent: function () { },
        config: {},
        help: {},

        package: {
            character: {
                character: {
                    //梅娅
                    "ms_meiya": ["female", "qun", 3, ["ms_gemeng"], ["des:【梅娅】<br>妈妈。", "ext:mengding/ms_meiya.jpg"]],

                    //雪
                    "ms_xue": ["female", "qun", 3, ["ms_rongxue"], ["des:【雪】<br>妈妈。", "ext:mengding/ms_xue.jpg"]],

                    //那由他
                    "ms_nayuta": ["female", "qun", 4, ["ms_liuhua"], ["des:【那由他】<br>岁月催人老。", "ext:mengding/ms_nayuta.jpg"]],

                    //加奈美
                    "ms_kanami": ["female", "qun", 4, ["ms_xingren"], ["des:【加奈美】<br>骚忍者。", "ext:mengding/ms_kanami.jpg"]],

                    //乌鲁泽
                    "ms_wuluze": ["female", "qun", 3, ["ms_chixie", "ms_zhongliu"], ["des:【乌鲁泽】<br> 轮椅角色。", "ext:mengding/ms_wuluze.jpg"]],

                    //秋月暮叶
                    "ms_akiyuki": ["female", "qun", "3/6", ["ms_fanhun", "ms_qianwang"], ["des:【秋月暮叶】<br> 愿得一人心。", "ext:mengding/ms_akiyuki.jpg"]],

                    //織塚美咲
                    "ms_orizuka": ["female", "qun", "3/4", ["ms_shuijing", "ms_chichu", "ms_qitian"], ["des:【織塚美咲】。", "ext:mengding/ms_orizuka.jpg"]],

                    //千崎入莉
                    "ms_chigasaki": ["female", "qun", 4, ["ms_lianmeng", "ms_shenlou", "ms_dianxing"], ["des:【千崎入莉】<br> 女神。", "ext:mengding/ms_chigasaki.jpg"]],

                    //千堂伽耶
                    "ms_chitose": ["female", "qun", 3, ["ms_zhujuan", "ms_chantong", "ms_duanyi"], ["des:【千堂伽耶】<br> 母亲。", "ext:mengding/ms_chitose.jpg"]],

                    //丛雨
                    "ms_congyu": ["female", "qun", 3, ["zengdao", "ms_baiwei", "ms_jianwu"], ["des:【丛雨】。", "ext:mengding/ms_congyu.jpg"]],

                    //千堂英里华
                    "ms_linlihua": ["female", "qun", 4, ["zhujuan", "ms_polong"], ["des:【千堂英里华】。", "ext:mengding/ms_linlihua.jpg"]],

                    //二阶堂真红
                    "ms_nikaido": ["female", "qun", 4, ["ms_duota", "ms_shizu"], ["des:【二阶堂真红】。", "ext:mengding/ms_nikaido.jpg"]],
                },
                translate: {
                    "extension_mengding_name": "萌定天下",
                    "ms_meiya": "梅娅",
                    "ms_xue": "雪",
                    "ms_nayuta": "那由他",
                    "ms_kanami": "加奈美",
                    "ms_wuluze": "乌鲁泽",
                    "ms_akiyuki": "秋月暮叶",
                    "ms_orizuka": "織塚美咲",
                    "ms_chigasaki": "千崎入莉",
                    "ms_chitose": "千堂伽耶",
                    "ms_congyu": "丛雨",
                    "ms_linlihua": "千堂英里华",
                    "ms_nikaido": "二阶堂真红",
                }
            },

            card: {
                card: {},
                translate: {},
                list: []
            },

            skill: {
                skill: {

                    //————————————————————————梅娅的技能————————————————————————
                    "ms_gemeng": {
                        audio: 2,
                        enable: "phaseUse",
                        ai: {
                            order: 8,
                            result: {
                                target: function (player, target) {
                                    var att = get.attitude(player, target);
                                    // 绝不弄队友，只搞敌人。敌人牌越多，被搞了越难受
                                    if (att < 0) {
                                        return Math.min(15, 5 + Math.abs(att) + target.countCards('he'));
                                    }
                                    return 0;
                                }
                            }
                        },
                        trigger: { player: "damageEnd" },
                        filter: function (event, player) {
                            return !player.hasSkill('ms_gemeng_fail');
                        },
                        filterTarget: function (card, player, target) {
                            return target.countCards('he') > 0;
                        },
                        content: function () {
                            "step 0"
                            if (!event.targets || event.targets.length === 0) {
                                player.chooseTarget('割梦：请选择一名有牌的角色，令其至少弃置一张牌', function (card, p, target) {
                                    return target.countCards('he') > 0;
                                }).set('ai', function (target) {
                                    var att = get.attitude(_status.event.player, target);
                                    if (att < 0) return Math.min(15, 5 + Math.abs(att));
                                    return 0;
                                });
                            } else {
                                event.target = event.targets[0];
                                event.goto(2);
                            }

                            "step 1"
                            if (result.bool && result.targets && result.targets.length) {
                                event.target = result.targets[0];
                                player.logSkill('ms_gemeng', event.target);
                            } else {
                                event.finish();
                            }

                            "step 2"
                            event.target.chooseToDiscard([1, Infinity], 'he', true, '割梦：请至少弃置一张牌（对方需重铸相同花色的牌）').set('ai', function (card) {
                                var meiya = _status.event.source;  // 发动技能的梅娅
                                var selected = ui.selected.cards;  // AI 当前已经点选准备弃置的牌

                                // 【合法情报获取】：我们只能看梅娅一共有多少张牌，以及她的装备区花色
                                var mCardTotalCount = meiya.countCards('he');
                                var mEquips = meiya.getCards('e');
                                var equipSuits = [];
                                for (var i = 0; i < mEquips.length; i++) {
                                    var s = get.suit(mEquips[i]);
                                    if (s && s !== 'none') equipSuits.push(s);
                                }

                                // 【防线1：绝对数量界限】
                                // 如果我已经选中的弃牌数量，达到了梅娅的总牌数。那她绝对不可能凑得出来！立刻停手，绝不多浪费一张牌！
                                if (selected.length >= mCardTotalCount) return -1;

                                // 【防线2：见好就收】
                                // 如果我已经垫了 2 张牌，梅娅想配对 2 种指定花色已经很头疼了。除非我正在看的是纯废牌（价值<4），否则不再继续弃牌，保留手牌厚度。
                                if (selected.length >= 2 && get.value(card) >= 4) return -1;

                                var suit = get.suit(card);
                                var val = get.value(card);

                                // 【进攻策略A：盲区狙击】
                                // 如果这牌的花色不在梅娅的公开装备区里，说明她必须用未知的暗置手牌来接招！这极有可能卡死她！
                                if (!equipSuits.includes(suit) && val < 7) {
                                    return 15 - val; // 极其乐意扔，权重拉满
                                }

                                // 【进攻策略B：垃圾海战术】
                                // 把手里价值 < 6 的破烂全扔出去，疯狂抬高重铸门槛，逼迫梅娅同样消耗这么多张牌才能打出伤害！
                                if (val < 6) {
                                    return 12 - val;
                                }

                                // 【保底机制】
                                // 如果还没选够 1 张强制底线，捏着鼻子也得挑个最便宜的扔。
                                if (selected.length === 0) {
                                    return 10 - val;
                                }

                                // 剩下的好牌（比如桃、无懈、重要装备）坚决不扔，留着硬扛那 1 点伤害！
                                return -1;

                            }).set('source', player);

                            "step 3"
                            var discardCards = [];
                            if (result.bool && result.cards && result.cards.length > 0) {
                                discardCards = result.cards;
                            }
                            event.discardCards = discardCards;

                            var suits = [];
                            for (var i = 0; i < discardCards.length; i++) {
                                var s = get.suit(discardCards[i]);
                                if (s && s !== 'none') suits.push(s);
                            }
                            event.neededSuits = suits;

                            var canFulfill = true;
                            var pCards = player.getCards('he');
                            var pSuits = [];
                            for (var i = 0; i < pCards.length; i++) {
                                var s = get.suit(pCards[i]);
                                if (s && s !== 'none') pSuits.push(s);
                            }

                            for (var i = 0; i < event.neededSuits.length; i++) {
                                var index = pSuits.indexOf(event.neededSuits[i]);
                                if (index !== -1) {
                                    pSuits.splice(index, 1);
                                } else {
                                    canFulfill = false;
                                    break;
                                }
                            }
                            event.canFulfill = canFulfill;

                            var suitStr = event.neededSuits.length > 0 ? event.neededSuits.map(function (s) { return get.translation(s); }).join('、') : '未知';
                            var promptStr = '割梦：目标弃置了 ' + discardCards.length + ' 张牌（需匹配花色：' + suitStr + '）';

                            event.controls = [];
                            if (event.canFulfill) {
                                event.controls.push('重铸对应的牌并造成一点伤害');
                            }
                            event.controls.push('此技能本回合失效');

                            player.chooseControl(event.controls).set('prompt', promptStr).set('ai', function () {
                                // 梅娅 AI：如果能打伤害，必打！
                                if (_status.event.controls.includes('重铸对应的牌并造成一点伤害')) {
                                    return '重铸对应的牌并造成一点伤害';
                                }
                                return '此技能本回合失效';
                            });

                            "step 4"
                            if (result.control === '重铸对应的牌并造成一点伤害') {
                                var prompt2 = '请选择重铸牌（需严格包含花色：' + event.neededSuits.map(function (s) { return get.translation(s); }).join('、') + '）';

                                player.chooseCard('he', event.neededSuits.length, prompt2, true).set('filterCard', function (card) {
                                    return _status.event.neededSuits.includes(get.suit(card));
                                }).set('filterOk', function () {
                                    var cards = ui.selected.cards;
                                    if (cards.length !== _status.event.neededSuits.length) return false;
                                    var required = _status.event.neededSuits.slice();
                                    for (var i = 0; i < cards.length; i++) {
                                        var s = get.suit(cards[i]);
                                        var idx = required.indexOf(s);
                                        if (idx !== -1) {
                                            required.splice(idx, 1);
                                        } else {
                                            return false;
                                        }
                                    }
                                    return required.length === 0;
                                }).set('neededSuits', event.neededSuits).set('ai', function (card) {
                                    // 梅娅重铸属于过牌（不亏牌），优先扔低价值牌
                                    return 7 - get.value(card);
                                });
                            } else {
                                player.addTempSkill('ms_gemeng_fail', { global: 'phaseAfter' });
                                game.log(player, '选择了', '#g【割梦】', '本回合失效');
                                event.finish();
                            }

                            "step 5"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                player.recast(result.cards);
                            } else {
                                player.addTempSkill('ms_gemeng_fail', { global: 'phaseAfter' });
                                game.log(player, '未能重铸对应的牌，', '#g【割梦】', '本回合失效');
                                event.finish();
                            }

                            "step 6"
                            event.target.damage(1, player);
                        }
                    },

                    "ms_gemeng_fail": {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: "本回合已失效，无法再发动【割梦】"
                        }
                    },


                    //———————————————————————————————雪的技能—————————————————————————————————————
                    "ms_rongxue": {
                        audio: 2,
                        enable: "phaseUse",
                        // 【AI 注入】：主动发动。AI 算得很精，能出没出过的牌（特别是杀、锦囊），而且出了还能先摸1张牌，血赚！
                        ai: {
                            order: 8,
                            result: {
                                player: function (player) {
                                    var used = player.storage.ms_rongxue_used || [];
                                    var cards = player.getCards('h');
                                    for (var i = 0; i < cards.length; i++) {
                                        var name = cards[i].name;
                                        if (used.indexOf(name) === -1 && player.hasUseTarget(cards[i]) && name !== 'shan' && name !== 'wuxie') {
                                            return 12; // 只要手里有能打出去的全新牌，就高优发动！
                                        }
                                    }
                                    // 没把握能出牌就别主动发动，免得白白弃2张
                                    return 0;
                                }
                            }
                        },
                        trigger: { target: "useCardToTargeted" },
                        filter: function (event, player) {
                            if (event.name === 'chooseToUse') {
                                return player.countCards('he') > 0 && !player.hasSkill('ms_rongxue_active');
                            }
                            return player.countCards('he') > 0 && event.player !== player;
                        },
                        // 【AI 注入】：被动拦截时的触发判断
                        check: function (event, player) {
                            var used = player.storage.ms_rongxue_used || [];
                            var cards = player.getCards('he');

                            // 1. 如果手里有未使用的保命牌（闪、桃、无懈），且目前正被敌人打，坚决发动来保命！
                            // 注意：底层引擎处理闪时，如果在这一步直接打了闪，就不用在后续引擎提示时出闪了。
                            for (var i = 0; i < cards.length; i++) {
                                var name = cards[i].name;
                                if (used.indexOf(name) === -1) {
                                    if ((name === 'shan' || name === 'wuxie') && get.attitude(player, event.player) < 0) return true;
                                }
                            }

                            // 2. 如果手里有大量废牌，可以借机弃 2 张洗白“杀”！
                            if (cards.length >= 3 && used.includes('sha')) return true;

                            return false;
                        },
                        content: function () {
                            "step 0"
                            if (event.name === 'chooseToUse') {
                                player.addTempSkill('ms_rongxue_active', 'phaseUseAfter');
                            }
                            player.draw(1);

                            "step 1"
                            player.chooseToUse('融雪：请使用一张未使用过牌名的牌，或点击【取消】改为弃置两张牌', function (card, player, event) {
                                var used = player.storage.ms_rongxue_used || [];
                                var name = card.name;

                                if (used.indexOf(name) !== -1) return false;
                                if (name === 'shan' || name === 'wuxie') return false;
                                if (name === 'tao' && player.hp >= player.maxHp) return false;
                                if (name === 'jiu' && player.hasSkill('jiu')) return false;

                                if (!player.hasUseTarget(card)) return false;

                                return true;
                            }).set('hiddenSkill', true).set('ai', function (card) {
                                // 【AI 注入】：如果有得选，优先出高价值牌
                                return get.value(card);
                            });

                            "step 2"
                            if (result.bool) {
                                event.finish();
                            } else {
                                if (player.countCards('he') >= 2) {
                                    player.chooseToDiscard(2, 2, 'he', true, '融雪：请弃置两张牌（若类型相同可恢复一个牌名）').set('ai', function (card) {
                                        // 【AI 注入】：智能组同类型对子
                                        var player = _status.event.player;
                                        if (ui.selected.cards.length === 1) {
                                            // 已经选了一张了，第二张必须选同样类型的！
                                            var firstType = get.type(ui.selected.cards[0]);
                                            if (get.type(card) === firstType) return 15 - get.value(card);
                                            return -1; // 类型不同绝对不选，免得白亏两张
                                        }
                                        // 第一张选最烂的
                                        return 8 - get.value(card);
                                    });
                                } else {
                                    event.finish();
                                }
                            }

                            "step 3"
                            if (result.bool && result.cards && result.cards.length === 2) {
                                var type1 = get.type(result.cards[0]);
                                var type2 = get.type(result.cards[1]);

                                if (type1 === type2) {
                                    event.discardType = type1;
                                    var used = player.storage.ms_rongxue_used || [];
                                    var availableNames = [];

                                    for (var i = 0; i < used.length; i++) {
                                        if (lib.card[used[i]] && lib.card[used[i]].type === type1) {
                                            availableNames.push(used[i]);
                                        }
                                    }

                                    if (availableNames.length > 0) {
                                        player.chooseControl(availableNames, '取消').set('prompt', '融雪：请选择令以下一个【' + get.translation(type1) + '牌】视为未使用过').set('ai', function () {
                                            // 【AI 注入】：优先恢复最核心的牌（比如基本牌里的杀、锦囊里的无中生有）
                                            var choices = _status.event.controls;
                                            if (choices.includes('sha')) return 'sha';
                                            if (choices.includes('wuzhong')) return 'wuzhong';
                                            if (choices.includes('shunshou')) return 'shunshou';
                                            if (choices.includes('tao')) return 'tao';
                                            return choices[0]; // 随便捞一个
                                        });
                                    } else {
                                        game.log(player, '目前没有已使用的【' + get.translation(type1) + '牌】');
                                        event.finish();
                                    }
                                } else {
                                    event.finish();
                                }
                            } else {
                                event.finish();
                            }

                            "step 4"
                            if (result.control && result.control !== '取消' && event.discardType) {
                                var name = result.control;
                                if (player.storage.ms_rongxue_used) {
                                    player.storage.ms_rongxue_used.remove(name);
                                    player.markSkill('ms_rongxue');
                                    game.log(player, '令牌名', '#y【' + get.translation(name) + '】', '视为', '#g未使用过');

                                    if (name === 'sha') {
                                        if (!player.hasSkill('ms_rongxue_sha_buff')) {
                                            player.addTempSkill('ms_rongxue_sha_buff', 'phaseUseAfter');
                                            player.storage.ms_rongxue_sha_buff = 0;
                                        }
                                        player.storage.ms_rongxue_sha_buff++;
                                        game.log(player, '本回合', '#y【杀】', '的使用次数上限', '#g+1');
                                    }
                                }
                            }
                        },
                        group: "ms_rongxue_track",
                        mark: true,
                        intro: {
                            name: "已使用的牌名",
                            markcount: function (storage, player) {
                                if (player.storage.ms_rongxue_used) {
                                    return player.storage.ms_rongxue_used.length;
                                }
                                return 0;
                            },
                            content: function (storage, player) {
                                var used = player.storage.ms_rongxue_used;
                                if (!used || used.length === 0) return "尚未记录任何已使用牌名";

                                var str = used.map(function (name) {
                                    return '【<font color="orange">' + get.translation(name) + '</font>】';
                                }).join("、");

                                return "本局已使用过：<br>" + str;
                            }
                        }
                    },

                    "ms_rongxue_sha_buff": {
                        charlotte: true,
                        onremove: function (player, skill) {
                            delete player.storage[skill];
                        },
                        mod: {
                            cardUsable: function (card, player, num) {
                                if (card.name === 'sha') {
                                    return num + (player.storage.ms_rongxue_sha_buff || 0);
                                }
                            }
                        }
                    },

                    "ms_rongxue_active": {
                        charlotte: true,
                    },

                    "ms_rongxue_track": {
                        trigger: { player: "useCard" },
                        forced: true,
                        silent: true,
                        popup: false,
                        filter: function (event, player) {
                            return true;
                        },
                        content: function (event, trigger, player) {
                            if (!player.storage.ms_rongxue_used) {
                                player.storage.ms_rongxue_used = [];
                            }
                            if (trigger.card && trigger.card.name) {
                                if (player.storage.ms_rongxue_used.indexOf(trigger.card.name) === -1) {
                                    player.storage.ms_rongxue_used.push(trigger.card.name);
                                    player.markSkill('ms_rongxue');
                                }
                            }
                        }
                    },

                    //————————————————————————那由他的技能————————————————————————

                    // 【流华】主技能：出牌阶段结束时，所有角色可扣置牌
                    ms_liuhua: {
                        audio: 2,
                        trigger: { player: 'phaseUseEnd' },
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                return current.countCards('h') > 0;
                            });
                        },
                        direct: true,
                        content: function () {
                            "step 0"
                            player.chooseBool(get.prompt('ms_liuhua')).set('ai', function () {
                                return game.hasPlayer(function (current) {
                                    return get.attitude(_status.event.player, current) < 0 && current.countCards('h') > 1;
                                });
                            });

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_liuhua');
                                player.storage.ms_liuhua_round = game.roundNumber;
                                player.addSkill('ms_liuhua_use');
                                game.players.forEach(function (p) {
                                    p.storage.ms_liuhua_cards = [];
                                });
                                var targets = game.players.filter(function (p) {
                                    return p.countCards('h') > 0;
                                }).sortBySeat();
                                if (targets.length === 0) {
                                    event.finish();
                                    return;
                                }
                                event.targets = targets;
                                event.currentIndex = 0;
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (event.currentIndex >= event.targets.length) {
                                game.log(player, '发动了', '#g【流华】', '，所有角色已完成扣置');
                                event.finish();
                                return;
                            }
                            var currentPlayer = event.targets[event.currentIndex];
                            event.currentPlayer = currentPlayer;
                            currentPlayer.chooseCard('h', [0, currentPlayer.countCards('h')],
                                '流华：请选择要扣置的手牌（可以不选）'
                            ).set('ai', function (card) {
                                var pl = _status.event.player;
                                var owner = _status.event.getParent().player;
                                if (get.attitude(pl, owner) < 0) {
                                    return 5 - get.value(card);
                                } else {
                                    if (get.tag(card, 'damage')) return 10 - get.value(card);
                                    return 2 - get.value(card);
                                }
                            }).set('prompt2',
                                '你可以扣置任意张手牌（可以不选）'
                            );
                            event.currentIndex++;

                            "step 3"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                var cp = event.currentPlayer;
                                cp.storage.ms_liuhua_cards = result.cards.slice(0);
                                var next = cp.addToExpansion(result.cards, cp, 'give');
                                next.gaintag.add('ms_liuhua');
                                game.log(cp, '扣置了', get.cnNumber(result.cards.length), '张牌');
                            }
                            event.goto(2);
                        },
                        ai: {
                            threaten: 1.5,
                        }
                    },

                    // 【流华·使用】本轮结束时，使用伤害类扣置牌
                    ms_liuhua_use: {
                        charlotte: true,
                        trigger: { global: 'roundStart' },
                        filter: function (event, player) {
                            return player.isAlive()
                                && typeof player.storage.ms_liuhua_round === 'number'
                                && game.roundNumber > player.storage.ms_liuhua_round;
                        },
                        forced: true,
                        popup: true,
                        content: function () {
                            "step 0"
                            player.logSkill('ms_liuhua');
                            game.log(player, '发动了', '#g【流华】', '的轮末效果');

                            // 初始化追踪数组
                            if (!player.storage.ms_liuhua_damage_ids) {
                                player.storage.ms_liuhua_damage_ids = [];
                            }

                            // 收集全场伤害类扣置牌
                            var allDamageCards = [];
                            var cardOwners = {};
                            var damageNames = ['sha', 'juedou', 'nanman', 'wanjian', 'huogong',
                                'leisha', 'huosha', 'shandian', 'tiesuo'
                            ];
                            game.players.forEach(function (p) {
                                var exps = p.getExpansions('ms_liuhua');
                                exps.forEach(function (c) {
                                    var cn = get.name(c);
                                    if (damageNames.indexOf(cn) !== -1 || get.tag(c, 'damage')) {
                                        allDamageCards.push(c);
                                        cardOwners[c.cardid || c.id] = p;
                                    }
                                });
                            });
                            event.damageCards = allDamageCards;
                            event.cardOwners = cardOwners;
                            event.usedIndex = 0;

                            if (allDamageCards.length === 0) {
                                game.log('没有伤害类扣置牌，跳过使用阶段');
                                event.goto(8);
                                return;
                            }

                            // 封印其他角色，给 owner 加 buff
                            game.players.forEach(function (p) {
                                if (p !== player && p.isAlive()) {
                                    p.addSkill('ms_liuhua_seal');
                                }
                            });
                            player.addSkill('ms_liuhua_buff');
                            player.addSkill('ms_liuhua_range');

                            "step 1"
                            // 循环：检查是否还有牌要处理
                            if (event.usedIndex >= event.damageCards.length) {
                                event.goto(7);
                                return;
                            }
                            var card = event.damageCards[event.usedIndex];
                            var ownerP = event.cardOwners[card.cardid || card.id];
                            if (!card || get.position(card) !== 'x') {
                                event.usedIndex++;
                                event.goto(1);
                                return;
                            }
                            // 记录牌 ID 用于伤害+1
                            var cardId = card.cardid || card.id;
                            player.storage.ms_liuhua_damage_ids.push(cardId);
                            var cardName = get.name(card, ownerP);
                            var cardNature = get.nature(card, ownerP);
                            event.currentCard = card;
                            event.currentCardId = cardId;
                            event.currentOwner = ownerP;
                            event.currentCardName = cardName;
                            event.currentCardNature = cardNature;

                            // 构建纯虚拟牌（不引用 expansion 实体，避免引擎死锁）
                            event.virtualCard = { name: cardName, nature: cardNature, isCard: true };

                            game.log(player, '即将使用【' + get.translation(cardName) + '】（来自' + get.translation(ownerP) + '的扣置牌）');

                            player.chooseBool('流华：是否使用【' + get.translation(cardName) + '】？（来自' + get.translation(ownerP) + '的扣置牌）').set('ai', function () {
                                var c = _status.event.card;
                                var pl = _status.event.player;
                                // 无距离限制下检查是否有合法目标
                                return pl.hasUseTarget(c);
                            }).set('card', event.virtualCard);

                            "step 2"
                            if (result.bool) {
                                // 选目标（已有无距离限制加成 via ms_liuhua_range）
                                player.chooseTarget('流华：请选择【' + get.translation(event.currentCardName) + '】的目标',
                                    function (card, pl, target) {
                                        var vc = _status.event.vcard;
                                        return pl.canUse(vc, target);
                                    }, true
                                ).set('vcard', event.virtualCard).set('ai', function (target) {
                                    var pl = _status.event.player;
                                    var vc = _status.event.vcard;
                                    return get.effect(target, vc, pl, pl);
                                });
                                // 如果卡牌只能指定自己或者类似情况，允许直接跳过
                                if (!player.hasUseTarget(event.virtualCard)) {
                                    event._skipUse = true;
                                    event.goto(5);
                                    return;
                                }
                            } else {
                                event.goto(5);
                            }

                            "step 3"
                            if (event._skipUse) {
                                event.goto(5);
                                return;
                            }
                            if (result.bool && result.targets && result.targets.length) {
                                event.useTargets = result.targets;
                                // 使用纯虚拟牌，不携带实体 expansion 卡
                                player.useCard(event.virtualCard, event.useTargets);
                            } else {
                                event.goto(5);
                            }

                            "step 4"
                            // 使用完毕：把实体 expansion 牌移入弃牌堆
                            var rc = event.currentCard;
                            var ro = event.currentOwner;
                            if (rc && get.position(rc) === 'x') {
                                if (ro) {
                                    ro.loseToDiscardpile(rc);
                                }
                            }
                            var cid = event.currentCardId;
                            var idx = player.storage.ms_liuhua_damage_ids.indexOf(cid);
                            if (idx !== -1) player.storage.ms_liuhua_damage_ids.splice(idx, 1);
                            event.goto(6);

                            "step 5"
                            // 跳过不使用，清理追踪
                            var cid2 = event.currentCardId;
                            var idx2 = player.storage.ms_liuhua_damage_ids.indexOf(cid2);
                            if (idx2 !== -1) player.storage.ms_liuhua_damage_ids.splice(idx2, 1);

                            "step 6"
                            event.usedIndex++;
                            event.goto(1);

                            "step 7"
                            // 移除 buff
                            player.removeSkill('ms_liuhua_buff');
                            player.removeSkill('ms_liuhua_range');
                            game.players.forEach(function (p) {
                                p.removeSkill('ms_liuhua_seal');
                            });

                            "step 8"
                            // 摸牌 = 剩余扣置牌数
                            var remaining = 0;
                            game.players.forEach(function (p) {
                                remaining += p.getExpansions('ms_liuhua').length;
                            });
                            if (remaining > 0) {
                                player.draw(remaining);
                                game.log(player, '摸了', get.cnNumber(remaining), '张牌');
                            }

                            "step 9"
                            // 弃置全部剩余扣置牌
                            game.players.forEach(function (p) {
                                var cards = p.getExpansions('ms_liuhua');
                                if (cards.length > 0) {
                                    p.loseToDiscardpile(cards);
                                    game.log('弃置了', get.translation(p), '的', get.cnNumber(cards.length), '张扣置牌');
                                }
                            });

                            "step 10"
                            // 清理
                            player.removeSkill('ms_liuhua_use');
                            delete player.storage.ms_liuhua_round;
                            delete player.storage.ms_liuhua_damage_ids;
                            game.players.forEach(function (p) {
                                delete p.storage.ms_liuhua_cards;
                            });
                        },
                        ai: { threaten: 0.1 }
                    },

                    // 【流华·封印】封印其他角色的手牌与装备，仅允许使用扣置牌
                    ms_liuhua_seal: {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: '手牌与装备被封印，仅可使用扣置牌',
                        },
                        mod: {
                            cardEnabled: function (card, player) {
                                var cards = [card];
                                if (Array.isArray(card.cards)) cards = cards.concat(card.cards);
                                for (var i = 0; i < cards.length; i++) {
                                    var c = cards[i];
                                    var pos = get.position(c, true);
                                    if ((pos === 'h' || pos === 'e')) {
                                        var exps = player.getExpansions('ms_liuhua');
                                        if (!exps.includes(c)) return false;
                                    }
                                }
                            },
                            cardRespondable: function (card, player) {
                                var cards = [card];
                                if (Array.isArray(card.cards)) cards = cards.concat(card.cards);
                                for (var i = 0; i < cards.length; i++) {
                                    var c = cards[i];
                                    var pos = get.position(c, true);
                                    if ((pos === 'h' || pos === 'e')) {
                                        var exps = player.getExpansions('ms_liuhua');
                                        if (!exps.includes(c)) return false;
                                    }
                                }
                            },
                            cardSavable: function (card, player) {
                                var cards = [card];
                                if (Array.isArray(card.cards)) cards = cards.concat(card.cards);
                                for (var i = 0; i < cards.length; i++) {
                                    var c = cards[i];
                                    var pos = get.position(c, true);
                                    if ((pos === 'h' || pos === 'e')) {
                                        var exps = player.getExpansions('ms_liuhua');
                                        if (!exps.includes(c)) return false;
                                    }
                                }
                            },
                            cardDiscardable: function (card, player) {
                                var cards = [card];
                                if (Array.isArray(card.cards)) cards = cards.concat(card.cards);
                                for (var i = 0; i < cards.length; i++) {
                                    var c = cards[i];
                                    var pos = get.position(c, true);
                                    if ((pos === 'h' || pos === 'e')) {
                                        var exps = player.getExpansions('ms_liuhua');
                                        if (!exps.includes(c)) return false;
                                    }
                                }
                            },
                        },
                        onremove: true,
                    },

                    // 【流华·增伤】流华扣置牌造成的伤害+1
                    ms_liuhua_buff: {
                        charlotte: true,
                        trigger: { source: 'damageBegin' },
                        filter: function (event, player) {
                            // 当此技能存在时，持有者造成的所有伤害+1
                            // （技能仅在流华用牌阶段存在，不会影响其他时段的伤害）
                            return true;
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            trigger.num++;
                            game.log(player, '的', '#g【流华】', '使伤害+1');
                        },
                    },

                    // 【流华·无距】使用流华扣置牌时无距离限制、无次数限制
                    ms_liuhua_range: {
                        charlotte: true,
                        mod: {
                            targetInRange: function (card, player, target) {
                                return true;
                            },
                            cardUsable: function (card, player, num) {
                                return Infinity;
                            },
                        },
                    },
                    //————————————————————————加奈美的技能————————————————————————

                    // 【幸忍】主技能
                    "ms_xingren": {
                        audio: 2,
                        trigger: { player: "useCard1" },
                        // 【AI 注入】：精准评估是否要将这牌收回并砸向自己！
                        check: function (event, player) {
                            if (!event.targets || event.targets.length === 0) return false;

                            var card = event.card;
                            var targets = event.targets;

                            // 基础摸牌收益 (每摸 1 张牌映射为 5 分的价值)
                            var score = targets.length * 5;

                            // 1. 评估把这牌强行砸在自己身上的后果
                            var effectOnSelf = get.effect(player, card, player, player);
                            // effectOnSelf 为正代表增益（如无中生有），为负代表反噬自残（如杀、南蛮）
                            score += effectOnSelf * 2;

                            // 2. 评估失去原有目标的代价
                            for (var i = 0; i < targets.length; i++) {
                                if (targets[i] !== player) {
                                    // 如果原本是打敌人的好机会，取消了自然是纯亏损
                                    var effectOnTarget = get.effect(targets[i], card, player, player);
                                    score -= effectOnTarget * 2;
                                }
                            }

                            // 3. 评估获取【幸忍】Buff 的潜在价值
                            // 只有当手里还有牌（除去当前打出的牌）能配合 Buff 时，这个 Buff 才值钱！
                            var remainingCards = player.getCards('h');
                            if (remainingCards.length > 1) {
                                score += 10; // Buff 的极高战略价值
                            }

                            // 综合清算：如果这波“自残/转移 + 摸牌 + 拿Buff”是正收益，果断发动！
                            return score > 0;
                        },
                        filter: function (event, player) {
                            if (!event.cards || event.cards.length === 0) return false;

                            var hasHandcard = false;
                            for (var i = 0; i < event.cards.length; i++) {
                                if (get.position(event.cards[i], true) !== 'e' && get.position(event.cards[i], true) !== 'j') {
                                    hasHandcard = true;
                                    break;
                                }
                            }
                            if (!hasHandcard) return false;
                            if (!event.targets || event.targets.length === 0) return false;

                            return true;
                        },
                        prompt: function (event, player) {
                            return '发动【幸忍】？摸' + event.targets.length + '张牌并将目标改为自己，随后选择强化效果。';
                        },
                        content: function () {
                            "step 0"
                            // 1. 摸牌
                            player.draw(trigger.targets.length);

                            "step 1"
                            game.log(player, '取消了', trigger.card, '的所有目标，并将目标强制改为了自己');

                            // 2. 强行清空目标并只追加自己
                            trigger.targets.length = 0;
                            trigger.targets.push(player);

                            // 3. 记录这张牌，防止 Buff 刚生成就被这张牌吃掉
                            player.storage.ms_xingren_ignore_card = trigger.card;

                            "step 2"
                            player.chooseControl('无次', '双增', '背水').set('choiceList', [
                                '仅下一张牌无次数限制',
                                '仅下一张基本/普通锦囊牌无视距离且目标+2',
                                '两项皆选（背水：失去1点体力）'
                            ]).set('prompt', '请选择【幸忍】的强化效果').set('ai', function () {
                                // 【AI 注入】：大尺度的 Buff 抉择博弈
                                var player = _status.event.player;

                                var scoreWuci = 0;       // 无次的价值
                                var scoreShuangzeng = 0; // 双增的价值

                                // 扫描手牌预测下一步收益
                                var hCards = player.getCards('h');
                                var shaCount = 0;
                                var hasSingleTrick = false;

                                for (var i = 0; i < hCards.length; i++) {
                                    var name = hCards[i].name;
                                    var type = get.type(hCards[i]);
                                    if (name === 'sha') shaCount++;
                                    // 筛选出顺手、过河、决斗、无中等单体/多体锦囊
                                    if (type === 'trick' && !hCards[i].subtype && name !== 'nanman' && name !== 'wanjian') {
                                        hasSingleTrick = true;
                                    }
                                }

                                // 评估【无次】：手里如果有多张杀，无次数限制才能打出恐怖连击
                                if (shaCount >= 2) scoreWuci += 10;

                                // 评估【双增】：只要有锦囊或者杀，+2 目标和无视距离就是毁天灭地的收益
                                if (hasSingleTrick || shaCount >= 1) scoreShuangzeng += 12;

                                // 评估【背水】（代价是失去1血）
                                var hpCost = 0;
                                if (player.hp <= 1) hpCost = 999;       // 1 血绝对不选背水自杀
                                else if (player.hp === 2) hpCost = 10;  // 2 血要极其谨慎
                                else hpCost = 2;                        // 3 血及以上，可以无脑奔放

                                var scoreBeishui = scoreWuci + scoreShuangzeng - hpCost;

                                // 选出得分最高的最优解
                                if (scoreBeishui > 0 && scoreBeishui >= scoreWuci && scoreBeishui >= scoreShuangzeng) return '背水';
                                if (scoreShuangzeng >= scoreWuci) return '双增';
                                return '无次';
                            });

                            "step 3"
                            // 根据返回的中文字符串发放 Buff
                            if (result.control === '无次') {
                                player.addSkill('ms_xingren_buff1');
                                game.log(player, '选择了', '#g仅无次数限制');
                            } else if (result.control === '双增') {
                                player.addSkill('ms_xingren_buff2');
                                game.log(player, '选择了', '#g仅无视距离且追加目标');
                            } else {
                                // 背水：两项全选，并掉血
                                player.addSkill('ms_xingren_buff1');
                                player.addSkill('ms_xingren_buff2');
                                game.log(player, '选择了', '#r两项皆选（背水）');
                                player.loseHp(1);
                            }
                        }
                    },

                    // ==========================================
                    // Buff 1：下一张牌无次数限制
                    // ==========================================
                    "ms_xingren_buff1": {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: "你使用的下一张牌无次数限制。"
                        },
                        mod: {
                            cardUsable: function (card, player, num) {
                                return Infinity; // 对所有牌生效
                            }
                        },
                        trigger: { player: "useCard1" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.card !== player.storage.ms_xingren_ignore_card;
                        },
                        content: function () {
                            player.removeSkill('ms_xingren_buff1');
                            delete player.storage.ms_xingren_ignore_card;

                            // 退还出牌次数
                            var stat = player.getStat().card;
                            if (stat[trigger.card.name] && stat[trigger.card.name] > 0) {
                                stat[trigger.card.name]--;
                            }
                        }
                    },

                    // ==========================================
                    // Buff 2：下一张基本/普通锦囊牌无视距离、目标+2
                    // ==========================================
                    "ms_xingren_buff2": {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: "你使用的下一张牌若是基本牌或普通锦囊牌，可以追加两个无距离限制的目标。"
                        },
                        mod: {
                            targetInRange: function (card, player, target) {
                                var type = get.type(card);
                                if (type === 'basic' || type === 'trick') return true;
                            },
                            selectTarget: function (card, player, range) {
                                var type = get.type(card);
                                if (type === 'basic' || type === 'trick') {
                                    if (range[1] !== -1 && typeof range[1] === 'number') {
                                        range[1] += 2;
                                    }
                                }
                            }
                        },
                        trigger: { player: "useCard1" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return event.card !== player.storage.ms_xingren_ignore_card;
                        },
                        content: function () {
                            player.removeSkill('ms_xingren_buff2');
                            delete player.storage.ms_xingren_ignore_card;
                        }
                    },

                    //————————————————————————乌鲁泽的技能————————————————————————
                    //分界线---------------------------------------------------------
                    "ms_chixie": {
                        audio: 2,
                        mark: true,
                        intro: {
                            name: "已发动的装备",
                            content: function (storage, player) {
                                if (!storage || !storage.length) return "尚未发动任何装备";
                                return "已发动过：<br>" + storage.map(function (name) { return '【' + get.translation(name) + '】'; }).join("、");
                            }
                        },
                        group: [
                            "ms_chixie_bagua", "ms_chixie_renwang", "ms_chixie_tengjia", "ms_chixie_baiyin",
                            "ms_chixie_zhuge", "ms_chixie_cixiong", "ms_chixie_qinggang", "ms_chixie_hanbing",
                            "ms_chixie_qinglong", "ms_chixie_guanshi", "ms_chixie_guding", "ms_chixie_fangtian",
                            "ms_chixie_qilin", "ms_chixie_zhuque", "ms_chixie_zhangba",
                            "ms_chixie_zhangba_viewas", "ms_chixie_zhangba_tracker",
                            "ms_chixie_after_trigger"
                        ],
                        checkProcessing: function (wuluze, target) {
                            if (wuluze === target) return true;
                            var ev = _status.event;
                            var depth = 0;
                            while (ev && depth < 30) {
                                if (ev.card) {
                                    var pos = get.position(ev.card, true);
                                    if (pos === 'p' || pos === 'o') return true;
                                }
                                if (ev.cards && ev.cards.length > 0) {
                                    for (var i = 0; i < ev.cards.length; i++) {
                                        var pos = get.position(ev.cards[i], true);
                                        if (pos === 'p' || pos === 'o') return true;
                                    }
                                }
                                if (ev.name === 'judge' && ev.card) return true;
                                ev = ev.parent;
                                depth++;
                            }
                            return false;
                        },
                        pushAfter: function (wuluze, target, equipName, cards, triggerEvent) {
                            if (!wuluze.storage.ms_chixie) wuluze.storage.ms_chixie = [];
                            if (!wuluze.storage.ms_chixie.includes(equipName)) {
                                wuluze.storage.ms_chixie.push(equipName);
                                wuluze.markSkill('ms_chixie');
                            }
                            if (!wuluze.storage.ms_chixie_after_data) wuluze.storage.ms_chixie_after_data = [];

                            var validCards = [];
                            if (cards) {
                                if (Array.isArray(cards)) {
                                    for (var i = 0; i < cards.length; i++) {
                                        if (cards[i] && typeof cards[i] === 'object' && cards[i].name) validCards.push(cards[i]);
                                    }
                                }
                                else if (typeof cards === 'object' && cards.name) validCards.push(cards);
                            }
                            wuluze.storage.ms_chixie_after_data.push({
                                equip: equipName,
                                target: target,
                                cards: validCards,
                                triggerEvent: triggerEvent
                            });
                        }
                    },

                    /* ================= 1. 防具序列 ================= */
                    "ms_chixie_bagua": {
                        // ★ 修复2：增加 chooseToUseBefore，兼容所有需要【闪】的时机
                        trigger: { global: ["chooseToRespondBefore", "chooseToUseBefore"] },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('bagua')) return false;
                            if (event.responded) return false;

                            if (typeof event.filterCard !== 'function') return false;
                            // ★ 修复3：严格按照无名杀底层要求，传入 3 个参数：(要求打出的牌, 当前玩家, 当前事件)
                            if (!event.filterCard({ name: 'shan', isCard: true }, event.player, event)) return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【八卦阵】（进行一次判定，若为红色则视为打出【闪】）？').set('ai', function () {
                                return get.attitude(player, trigger.player) > 0;
                            });
                            "step 1"
                            if (result.bool) {
                                event.chixie_bagua_chosen = true;
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【八卦阵】');

                                trigger.player.judge('bagua', function (card) {
                                    return (get.color(card) === 'red') ? 1.5 : -0.5;
                                });
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (event.chixie_bagua_chosen) {
                                if (result.judge > 0) {
                                    trigger.unmeitou = true;
                                    trigger.result = { bool: true, card: { name: 'shan', isCard: true } };
                                    trigger.responded = true;
                                    trigger.animate = false;
                                }
                                // 判定结束，将判定牌传给主技能收割
                                if (result.card) {
                                    lib.skill.ms_chixie.pushAfter(player, trigger.player, 'bagua', [result.card], trigger);
                                }
                            }
                        }
                    },
                    "ms_chixie_renwang": {
                        trigger: { global: "useCardToBefore" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('renwang')) return false;
                            if (event.card.name !== 'sha' || get.color(event.card) !== 'black') return false;
                            if (event.player.hasSkillTag('unequip', false, { name: event.card.name, target: event.target, card: event.card })) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.target) + ' 发动【仁王盾】（使该黑色【杀】对其无效）？').set('ai', function () {
                                return get.attitude(player, trigger.target) > 0;
                            });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.target, '发动了', '#y【仁王盾】');
                                trigger.cancel();

                                // ★ 核心修复：抓取真实的物理牌，并把最高层级的父事件存进去，确保 After 能监听到！
                                var physicalCards = trigger.getParent().cards || [trigger.card];
                                lib.skill.ms_chixie.pushAfter(player, trigger.target, 'renwang', physicalCards, trigger.getParent());
                            }
                        }
                    },
                    "ms_chixie_tengjia": {
                        trigger: { global: ["useCardToBefore", "damageBegin3"] },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('tengjia')) return false;

                            // ★ 核心修复：不问 event.name，直接看有没有 event.target。
                            // 如果有 target，说明这是在对目标使用卡牌（useCardTo 阶段）
                            if (event.target) {
                                if (!event.card) return false;

                                // 如果攻击者有“无视防具”的技能（如青釭剑），强制不触发
                                if (event.player.hasSkillTag('unequip', false, { name: event.card.name, target: event.target, card: event.card })) return false;

                                // 拦截南蛮、万箭、无属性普通杀
                                if (event.card.name === 'nanman' || event.card.name === 'wanjian') return true;
                                if (event.card.name === 'sha' && !event.card.nature) return true;

                                return false;
                            }
                            // 如果没有 target，说明这是在结算伤害（damage 阶段）
                            else {
                                if (event.nature === 'fire') return true;
                                return false;
                            }
                        },
                        content: function () {
                            "step 0"
                            // 同样用 trigger.target 来区分弹窗
                            if (trigger.target) {
                                var cardNameStr = (trigger.card.name === 'sha') ? '普通【杀】' : '【' + get.translation(trigger.card) + '】';
                                player.chooseBool('是否令 ' + get.translation(trigger.target) + ' 发动【藤甲】（使' + cardNameStr + '对其无效）？').set('ai', function () {
                                    return get.attitude(player, trigger.target) > 0;
                                });
                            } else {
                                player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【藤甲】（其受到的火属性伤害+1）？').set('ai', function () {
                                    return get.attitude(player, trigger.player) < 0;
                                });
                            }

                            "step 1"
                            if (result.bool) {
                                if (trigger.target) {
                                    game.log(player, '发动了', '#g【持械】', '，令', trigger.target, '发动了', '#y【藤甲】');
                                    trigger.cancel();
                                    // 抓取被无效的牌并推送给你的 After 技能
                                    var physicalCards = trigger.getParent().cards || [trigger.card];
                                    lib.skill.ms_chixie.pushAfter(player, trigger.target, 'tengjia', physicalCards, trigger.getParent());
                                } else {
                                    game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【藤甲】');
                                    trigger.num++;
                                    // 伤害加深不涉及卡牌移动，所以推入空数组
                                    lib.skill.ms_chixie.pushAfter(player, trigger.player, 'tengjia', [], trigger);
                                }
                            }
                        }
                    },
                    "ms_chixie_baiyin": {
                        trigger: { global: "damageBegin1" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('baiyin')) return false;
                            if (event.num < 1) return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【白银狮子】？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【白银狮子】');
                                if (trigger.num > 1) trigger.num = 1;
                                trigger.player.addTempSkill('ms_chixie_baiyin_recover', 'damageAfter');
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'baiyin', null, trigger);
                            }
                        }
                    },
                    "ms_chixie_baiyin_recover": {
                        trigger: { player: "damageAfter" },
                        forced: true, charlotte: true, popup: false,
                        content: function () {
                            player.recover();
                            game.log(player, '发动了【白银狮子】，回复了1点体力');
                        }
                    },

                    /* ================= 2. 武器序列 ================= */
                    "ms_chixie_zhuge": {
                        trigger: { global: "useCardAfter" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('zhuge')) return false;
                            if (event.card.name !== 'sha' || _status.currentPhase !== event.player) return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【诸葛连弩】？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【诸葛连弩】');
                                trigger.player.addTempSkill('ms_chixie_zhuge_mod', 'phaseUseAfter');
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'zhuge', null, trigger);
                            }
                        }
                    },
                    "ms_chixie_zhuge_mod": {
                        charlotte: true,
                        mod: { cardUsable: function (card, player, num) { if (card.name === 'sha') return Infinity; } }
                    },
                    "ms_chixie_cixiong": {
                        trigger: { global: "useCardToPlayered" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('cixiong')) return false;
                            if (event.card.name !== 'sha') return false;
                            if (event.player.sex === event.target.sex || event.player.sex === 'unknown' || event.target.sex === 'unknown') return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【雌雄双股剑】？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【雌雄双股剑】');
                                trigger.target.chooseToDiscard('雌雄双股剑：请弃置一张手牌，或点击【取消】令' + get.translation(trigger.player) + '摸一张牌', 'h').set('ai', function (card) { return 7 - get.value(card); });
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'cixiong', result.cards, trigger);
                            } else {
                                trigger.player.draw();
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'cixiong', null, trigger);
                            }
                        }
                    },
                    "ms_chixie_qinggang": {
                        trigger: { global: "useCardToBefore" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (event.card.name !== 'sha') return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('qinggang')) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否发动【青釭剑】（令此【杀】无视 ' + get.translation(trigger.target) + ' 的防具）？').set('ai', function () {
                                // AI逻辑：如果对面有防具（装备区下标为2），就果断发动
                                return trigger.target.getEquip(2) ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，触发了', '#y【青釭剑】', '的效果');

                                // ★ 核心 API：为你临时添加一个专属的无视防具副技能，持续到这本杀结算完毕(useCardAfter)
                                player.addTempSkill('ms_chixie_qinggang_temp', 'useCardAfter');

                                // 额外：为目标临时添加一个技能，使其装备在本次结算期间失效（确保防具效果被屏蔽）
                                if (trigger.target && trigger.target.isIn()) {
                                    trigger.target.addTempSkill('ms_chixie_qinggang_target_temp', 'useCardAfter');
                                }

                                // 青釭剑没有需要弃置或判定的实体牌，所以传空数组 []
                                // 但你依然可以通过选“2”令该目标出杀，实现战术压制
                                lib.skill.ms_chixie.pushAfter(player, trigger.target, 'qinggang', [], trigger);
                            }
                        }
                    },

                    // ★ 必须放在武将包 skills 列表里的临时副技能（不需要加到 group 里）
                    "ms_chixie_qinggang_temp": {
                        charlotte: true, // 隐藏技能，不在面板显示
                        mod: {
                            // 无名杀底层接口：当卡牌结算时，返回 true 即代表无视防具
                            unequip: function (card, player, target) {
                                if (card.name === 'sha') return true;
                            }
                        }
                    },
                    // 临时技能：在本次结算期间令目标所有装备失效，确保青釭剑效果生效
                    "ms_chixie_qinggang_target_temp": {
                        charlotte: true,
                        mod: {
                            equipEnabled: function (card, player) {
                                return false; // 在本次结算期间该目标的装备全部被视为无效
                            }
                        }
                    },
                    "ms_chixie_hanbing": {
                        trigger: { global: "damageBegin1" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            // 【修正1】必须是你（player）作为伤害来源（source），即你砍别人才能发动武器
                            if (event.source !== player) return false;

                            // 检查寒冰剑是否已发动过
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('hanbing')) return false;

                            // 必须是【杀】造成的伤害
                            if (!event.card || event.card.name !== 'sha') return false;

                            // 【修正2】必须是承受伤害的角色（event.player）有牌可弃
                            if (!event.player || event.player.countCards('he') === 0) return false;

                            // checkProcessing 溯源（传入你和目标）
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            // 优化了文本，因为是你自己发动的武器效果，直接写“是否发动【寒冰剑】”即可
                            player.chooseBool('是否发动【寒冰剑】（防止对 ' + get.translation(trigger.player) + ' 的伤害，改为弃置其两张牌）？').set('ai', function () { return 1; });

                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，触发了', '#y【寒冰剑】', '的效果');
                                trigger.cancel(); // 防止伤害
                                // 你（trigger.source）选择目标（trigger.player）的牌弃置
                                player.choosePlayerCard(trigger.player, 'he', [1, 2], true, '寒冰剑：请弃置目标至多两张牌');
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.links && result.links.length > 0) {
                                trigger.player.discard(result.links);

                                // 【修正3】对齐 pushAfter 的传参！
                                // 顺序：(吴六奇, 目标, 装备名, 弃置的牌, 触发事件)
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'hanbing', result.links, trigger);
                            }
                        }
                    },
                    "ms_chixie_qinglong": {
                        trigger: { global: "shaMiss" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('qinglong')) return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【青龙偃月刀】（继续出杀）？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【青龙偃月刀】');
                                trigger.player.chooseToUse('青龙偃月刀：你可以继续对其使用一张【杀】', function (card, player, ev) { return get.name(card) === 'sha'; }, trigger.target).set('addCount', false);
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result && result.bool) {
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'qinglong', null, trigger);
                            }
                        }
                    },
                    "ms_chixie_guanshi": {
                        // 完美复刻原版：同时监听 杀未命中 和 事件被抵消
                        trigger: { player: ['shaMiss', 'eventNeutralized'] },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            // 1. 过滤：必须是使用【杀】且目标还在场上
                            if (event.type !== 'card' || event.card.name !== 'sha' || !event.target.isIn()) return false;

                            // 2. 过滤：至少有两张牌可以弃置
                            if (player.countCards('he') < 2) return false;

                            // 3. 过滤：本回合【持械】是否已经触发过贯石斧
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('guanshi')) return false;

                            return true;
                        },
                        content: function () {
                            "step 0"
                            // 使用原版的 chooseToDiscard 原生弃牌接口
                            player.chooseToDiscard(2, 'he', '是否发动【贯石斧】？（弃置两张牌，令此【杀】依然命中）').set('ai', function (card) {
                                var evt = _status.event.getTrigger();
                                // AI逻辑：如果对目标是敌对态度，优先丢弃低价值手牌
                                if (get.attitude(player, evt.target) < 0) {
                                    return 8 - get.value(card);
                                }
                                return -1;
                            });

                            "step 1"
                            if (result.bool && result.cards && result.cards.length === 2) {
                                game.log(player, '发动了', '#g【持械】', '，触发了', '#y【贯石斧】', '的效果');

                                // ================= 核心修复：使用原版底层状态机接管 =================
                                if (event.triggername === 'shaMiss') {
                                    // 如果是被闪避：掐断未命中时间线，强行进入命中时间线
                                    trigger.untrigger();
                                    trigger.trigger('shaHit');
                                    trigger._result.bool = false;
                                    trigger._result.result = null;
                                } else {
                                    // 如果是被无懈可击等抵消：强行解除抵消状态
                                    trigger.unneutralize();
                                }
                                // =================================================================

                                // ★ 专属联动：将这两张实体牌推入你的 After 技能缓存，结算后选 1 即可白嫖拿回！
                                lib.skill.ms_chixie.pushAfter(player, trigger.target, 'guanshi', result.cards, trigger);
                            }
                        }
                    },
                    "ms_chixie_guding": {
                        trigger: { global: "damageBegin1" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('guding')) return false;
                            if (!event.card || event.card.name !== 'sha') return false;
                            if (event.player.countCards('h') > 0) return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.source);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.source) + ' 发动【古锭刀】（伤害+1）？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.source, '发动了', '#y【古锭刀】');
                                trigger.num += 1;
                                lib.skill.ms_chixie.pushAfter(player, trigger.source, 'guding', null, trigger);
                            }
                        }
                    },
                    "ms_chixie_fangtian": {
                        // 【关键点1】useCard1 时机：这本【杀】已经打出并选定了初始目标，最适合用来“额外指定目标”
                        trigger: { global: "useCard1" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            // 1. 武器发动限制：必须是你自己使用卡牌
                            if (event.player !== player) return false;

                            // 2. 必须是【杀】
                            if (!event.card || event.card.name !== 'sha') return false;

                            // 3. 必须没有手牌 (如果是用最后一张手牌打出的杀，此时手牌数为0，符合逻辑)
                            if (player.countCards('h') > 0) return false;

                            // 4. 检查是否已经发动过方天画戟
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('fangtian')) return false;

                            // 5. 检查场上是否还有合法的额外目标（不在当前这本杀的目标列表中，且距离/条件符合）
                            return game.hasPlayer(function (current) {
                                return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current);
                            });
                        },
                        content: function () {
                            "step 0"
                            // 弹窗让玩家选择额外目标
                            player.chooseTarget(function (card, player, target) {
                                // 通过 _status.event.triggerEvent 拿到那本【杀】的事件
                                var trigger = _status.event.triggerEvent;
                                // 不能是已经被选为目标的人
                                if (trigger.targets.includes(target)) return false;
                                // 必须是这本【杀】的合法目标
                                return lib.filter.targetEnabled2(trigger.card, player, target);
                            }).set('prompt', '是否发动【方天画戟】？')
                                .set('prompt2', '你可以为这本【杀】额外指定至多两个目标')
                                .set('selectTarget', [1, 2])
                                .set('triggerEvent', trigger)
                                .set('ai', function (target) {
                                    // AI逻辑：如果是敌人就打（收益大于0）
                                    var player = _status.event.player;
                                    var trigger = _status.event.triggerEvent;
                                    return get.effect(target, trigger.card, player, player);
                                });

                            "step 1"
                            // 如果玩家选了目标并点了确定
                            if (result.bool && result.targets && result.targets.length > 0) {
                                game.log(player, '发动了', '#g【持械】', '，触发了', '#y【方天画戟】', '的效果');

                                // 【关键点2】将新选的目标加入到原有的目标数组中
                                trigger.targets.addArray(result.targets);

                                // 对目标按座位进行排序，这是无名杀里添加目标后的标准操作，确保顺时针依次结算
                                trigger.targets.sortBySeat();

                                // 【关键点3】记录发动状态
                                // 因为这是你的武器，发动效果的角色是“你自己”，所以 target 传 player
                                // 方天画戟没有因此弃置或判定的牌，所以 cards 传 空数组 []
                                lib.skill.ms_chixie.pushAfter(player, player, 'fangtian', [], trigger);
                            }
                        }
                    },
                    "ms_chixie_qilin": {
                        trigger: { global: "damageEnd" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('qilin')) return false;
                            if (!event.card || event.card.name !== 'sha') return false;
                            var equips = event.player.getCards('e', function (card) {
                                var sub = get.subtype(card);
                                return sub === 'equip3' || sub === 'equip4';
                            });
                            if (equips.length === 0) return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.source);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.source) + ' 发动【麒麟弓】（弃置其坐骑）？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.source, '发动了', '#y【麒麟弓】');
                                var equips = trigger.player.getCards('e', function (card) {
                                    var sub = get.subtype(card);
                                    return sub === 'equip3' || sub === 'equip4';
                                });
                                trigger.source.chooseButton(['麒麟弓：请选择要弃置的坐骑', equips]).set('ai', function (button) { return 1; });
                            } else {
                                event.finish();
                            }
                            "step 2"
                            if (result.bool && result.links && result.links.length > 0) {
                                trigger.player.discard(result.links);
                                lib.skill.ms_chixie.pushAfter(player, trigger.source, 'qilin', result.links, trigger);
                            }
                        }
                    },
                    "ms_chixie_zhuque": {
                        trigger: { global: "useCardBefore" },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('zhuque')) return false;
                            if (event.card.name !== 'sha' || event.card.nature === 'fire') return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【朱雀羽扇】（改为火杀）？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【朱雀羽扇】');
                                trigger.card.nature = 'fire';
                                game.log(trigger.player, '将', trigger.card, '改为了火属性');
                                lib.skill.ms_chixie.pushAfter(player, trigger.player, 'zhuque', null, trigger);
                            }
                        }
                    },

                    // 丈八蛇矛：通过过滤出牌阶段（phaseUse）避免无限询问
                    "ms_chixie_zhangba": {
                        trigger: { global: ["chooseToRespondBefore", "chooseToUseBefore"] },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player === event.player) return false;
                            if (player.storage.ms_chixie && player.storage.ms_chixie.includes('zhangba')) return false;
                            if (event.filterCard && !event.filterCard({ name: 'sha' }, event.player, event)) return false;
                            if (event.player.countCards('he') < 2) return false;
                            if (event.name === 'chooseToUse' && event.parent && event.parent.name === 'phaseUse') return false;
                            return lib.skill.ms_chixie.checkProcessing(player, event.player);
                        },
                        content: function () {
                            "step 0"
                            player.chooseBool('是否令 ' + get.translation(trigger.player) + ' 发动【丈八蛇矛】（两牌当杀）？').set('ai', function () { return 1; });
                            "step 1"
                            if (result.bool) {
                                game.log(player, '发动了', '#g【持械】', '，令', trigger.player, '发动了', '#y【丈八蛇矛】');
                                trigger.player.addTempSkill('ms_chixie_zhangba_viewas', ['chooseToRespondAfter', 'chooseToUseAfter']);
                            }
                        }
                    },
                    "ms_chixie_zhangba_viewas": {
                        enable: ["chooseToRespond", "chooseToUse"],
                        filterCard: function (card, player) { return true; },
                        selectCard: 2,
                        position: "he",
                        viewAs: { name: "sha" },
                        prompt: "【丈八蛇矛】将两张牌当【杀】使用或打出",
                        check: function (card) { return 5 - get.value(card); },
                        filter: function (event, player) {
                            if (event.player !== player) return false;
                            if (player.hasSkill('ms_chixie') && player.storage.ms_chixie && player.storage.ms_chixie.includes('zhangba')) return false;
                            return true;
                        }
                    },
                    "ms_chixie_zhangba_tracker": {
                        trigger: { global: ["useCard1", "respondBefore"] },
                        forced: true, charlotte: true, popup: false,
                        filter: function (event, player) {
                            return event.skill === 'ms_chixie_zhangba_viewas';
                        },
                        content: function () {
                            var cards = [];
                            if (trigger.cards) cards = trigger.cards;
                            else if (trigger.card) cards = [trigger.card];
                            lib.skill.ms_chixie.pushAfter(player, trigger.player, 'zhangba', cards, trigger);
                        }
                    },

                    /* ================= 3. 收尾结算引擎：你编写的代码增强版 ================= */
                    "ms_chixie_after_trigger": {
                        trigger: {
                            // ★ 核心修复1：修正了无名杀标准的基础事件名，确保 100% 能捕捉到 After 节点
                            global: ["useCardAfter", "respondAfter", "damageAfter", "shaMissAfter", "useCardToAfter", "judgeAfter", "chooseToRespondAfter", "chooseToUseAfter"]
                        },
                        // ★ 核心修复2：降低了 priority，确保它在其他技能收尾后执行，此时卡牌一定已经进弃牌堆
                        forced: true, charlotte: true, popup: false, priority: -15,
                        filter: function (event, player) {
                            if (!player.storage.ms_chixie_after_data || player.storage.ms_chixie_after_data.length === 0) return false;
                            for (var i = 0; i < player.storage.ms_chixie_after_data.length; i++) {
                                var data = player.storage.ms_chixie_after_data[i];
                                // 向上追溯：检查当前的触发器是否匹配你 pushAfter 时保存的根节点
                                var ev = data.triggerEvent;
                                while (ev) {
                                    if (event === ev) return true;
                                    ev = ev.parent;
                                }
                            }
                            return false;
                        },
                        content: function () {
                            "step 0"
                            // 提取与本次 After 事件对应的那一条数据，防止多件装备同时触发时报错
                            var matchedIndex = -1;
                            for (var i = 0; i < player.storage.ms_chixie_after_data.length; i++) {
                                var data = player.storage.ms_chixie_after_data[i];
                                var ev = data.triggerEvent;
                                while (ev) {
                                    if (trigger === ev) {
                                        matchedIndex = i;
                                        break;
                                    }
                                    ev = ev.parent;
                                }
                                if (matchedIndex !== -1) break;
                            }
                            if (matchedIndex === -1) {
                                event.finish();
                                return;
                            }
                            var data = player.storage.ms_chixie_after_data.splice(matchedIndex, 1)[0];
                            event.chixie_data = data;

                            // 抓取在弃牌堆（'d'）的牌
                            // 抓取在弃牌堆（'d'）或处理区（'c'、'p'）的实体牌
                            var valid_cards = [];
                            if (data.cards) {
                                for (var i = 0; i < data.cards.length; i++) {
                                    var c = data.cards[i];
                                    // 如果是虚拟牌（比如赵云把闪当杀），获取其内部包含的物理牌数组
                                    var physical_cards = c.cards ? c.cards : [c];
                                    for (var j = 0; j < physical_cards.length; j++) {
                                        var p_card = physical_cards[j];
                                        var pos = get.position(p_card, true);
                                        // 'd'弃牌堆, 'c'桌面上/处理区, 'o'废弃区, 'p'处理区
                                        if (pos === 'd' || pos === 'c' || pos === 'o' || pos === 'p') {
                                            valid_cards.push(p_card);
                                        }
                                    }
                                }
                            }
                            event.valid_cards = valid_cards;

                            var controls = [];
                            if (valid_cards.length > 0) controls.push('获得被弃置/无效/判定的牌');
                            controls.push('令其将牌当【杀】使用');

                            player.chooseControl(controls).set('prompt', '持械（' + get.translation(data.equip) + '）结算：请选择一项').set('ai', function () {
                                return _status.event.valid_cards.length > 0 ? '获得被弃置/无效/判定的牌' : '令其将牌当【杀】使用';
                            }).set('valid_cards', valid_cards);

                            "step 1"
                            if (result.control === '获得被弃置/无效/判定的牌') {
                                if (event.valid_cards.length > 0) {
                                    player.gain(event.valid_cards, 'gain2');
                                    game.log(player, '获得了', event.valid_cards);
                                }
                                event.finish();
                            } else {
                                var target = event.chixie_data.target;
                                if (target.isAlive() && target.countCards('he') > 0) {
                                    target.chooseCardTarget({
                                        prompt: '持械：请选择至少一张牌当作【杀】使用',
                                        filterCard: function (card, player) { return true; },
                                        selectCard: [1, Infinity],
                                        position: 'he',
                                        filterTarget: function (card, player, tar) {
                                            return player.canUse({ name: 'sha' }, tar);
                                        },
                                        ai1: function (card) { return 7 - get.value(card); },
                                        ai2: function (tar) { return get.effect(tar, { name: 'sha' }, _status.event.player, _status.event.player); }
                                    }).set('forced', true).set('mandatory', true);
                                } else {
                                    event.finish();
                                }
                            }
                            "step 2"
                            if (result.bool && result.cards && result.targets) {
                                var target = event.chixie_data.target;
                                target.useCard({ name: 'sha' }, result.cards, result.targets);
                            }
                        }
                    },
                    // 二技能：中流（重置封印）
                    "ms_zhongliu": {
                        audio: 2,
                        trigger: { player: "useCard" },
                        forced: true,
                        filter: function (event, player) {
                            if (!event.cards || event.cards.length === 0) return true;
                            var lostHand = player.hasHistory('lose', function (evt) {
                                return evt.getParent() === event && evt.hs && evt.hs.length > 0;
                            });
                            return !lostHand;
                        },
                        content: function () {
                            "step 0"
                            var skills = player.getStockSkills(true, true);
                            game.expandSkills(skills);
                            var resetSkills = [];
                            var suffixs = ['used', 'round', 'block', 'blocker'];

                            for (var skill of skills) {
                                var info = get.info(skill);
                                if (typeof info.usable == 'number') {
                                    if (player.hasSkill('counttrigger') && player.storage.counttrigger[skill] && player.storage.counttrigger[skill] >= 1) {
                                        delete player.storage.counttrigger[skill];
                                        resetSkills.add(skill);
                                    }
                                    if (typeof get.skillCount(skill) == 'number' && get.skillCount(skill) >= 1) {
                                        delete player.getStat('skill')[skill];
                                        resetSkills.add(skill);
                                    }
                                }
                                if (info.round && player.storage[skill + '_roundcount']) {
                                    delete player.storage[skill + '_roundcount'];
                                    resetSkills.add(skill);
                                }
                                if (player.storage[`temp_ban_${skill}`]) {
                                    delete player.storage[`temp_ban_${skill}`];
                                }
                                if (player.awakenedSkills.includes(skill)) {
                                    player.restoreSkill(skill);
                                    resetSkills.add(skill);
                                }
                                for (var suffix of suffixs) {
                                    if (player.hasSkill(skill + '_' + suffix)) {
                                        player.removeSkill(skill + '_' + suffix);
                                        resetSkills.add(skill);
                                    }
                                }
                            }

                            // 【联动修复】：同步更改为 ms_chixie，使其能够正确清空限制并刷新 UI 面板
                            if (player.storage.ms_chixie && player.storage.ms_chixie.length > 0) {
                                player.storage.ms_chixie = [];
                                player.unmarkSkill('ms_chixie');
                                resetSkills.add('ms_chixie');
                            }

                            if (resetSkills.length) {
                                var str = '';
                                for (var i of resetSkills) {
                                    str += '【' + get.translation(i) + '】、';
                                }
                                game.log(player, '触发了', '#g【中流】', '，重置了', '#y' + str.slice(0, -1), '的限制！');
                            } else {
                                game.log(player, '触发了', '#g【中流】');
                            }
                        }
                    },



                    //————————————————————————秋月暮叶的技能————————————————————————

                    // 【一技能：主动召唤】
                    "ms_fanhun": {
                        audio: 2,
                        enable: "phaseUse",
                        group: ["ms_fanhun_trigger"],
                        filter: function (event, player) {
                            if (player.maxHp <= 1) return false;
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i].is_ms_fanhun_puppet && game.players[i].ms_fanhun_owner === player) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        content: function () {
                            "step 0"
                            var max_lose = player.maxHp - 1;
                            var list = [];
                            for (var i = 1; i <= max_lose; i++) {
                                list.push(i.toString());
                            }
                            list.push("取消");
                            player.chooseControl(list).set('prompt', '出牌阶段：请选择减少的体力上限点数以召唤【人偶】');

                            "step 1"
                            if (result.control && result.control !== "取消") {
                                event.lose_num = parseInt(result.control);
                                player.chooseTarget('请选择一个位置：人偶将召唤在该角色的下家', function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    return target === player ? 1 : 0;
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.spawn_pos = result.targets[0];
                                player.chooseTarget('请选择人偶的队友（未选中的角色将被视为人偶的敌人）', [0, game.players.length], function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    return game.hasPlayer(function (current) {
                                        return current === target && current.isFriendOf(player);
                                    }) ? 1 : 0;
                                });
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (result.bool) {
                                var teammates = result.targets || [];
                                var spawn_pos = event.spawn_pos;
                                var lose_num = event.lose_num;

                                player.loseMaxHp(lose_num);

                                var target_seat = game.players.indexOf(spawn_pos) + 1;
                                if (target_seat > game.players.length) target_seat = game.players.length;
                                var puppet = game.addPlayer(target_seat, player.name);
                                if (typeof puppet.getId === 'function') puppet.getId();

                                puppet.node.name.innerHTML = '人<br>偶';
                                puppet.sex = 'none';
                                puppet.maxHp = lose_num;
                                puppet.hp = lose_num;
                                puppet.group = player.group;
                                puppet.update();

                                puppet.is_ms_fanhun_puppet = true;
                                puppet.ms_fanhun_owner = player;
                                puppet.identityShown = false;

                                // ==========================================
                                // 【终极修复：基于无名杀底层的 AI 态度重写】
                                // ==========================================
                                if (!teammates.contains(player)) teammates.push(player);
                                puppet.storage.ms_fanhun_teammates = teammates;

                                puppet.ai = puppet.ai || {};

                                // 1. 拦截 AI 判定：人偶对其他人的态度
                                puppet.ai.modAttitudeFrom = function (from, to, currentAttitude) {
                                    // from 就是人偶自己，如果在设定的队友名单里，绝对死忠(10)；否则死敌(-10)
                                    if (from.storage.ms_fanhun_teammates.contains(to)) return 10;
                                    return -10;
                                };

                                // 2. 拦截 AI 判定：其他人对人偶的态度
                                puppet.ai.modAttitudeTo = function (from, to, currentAttitude) {
                                    // to 是人偶，让设定的队友不要误伤人偶，非队友则疯狂集火人偶
                                    if (to.storage.ms_fanhun_teammates.contains(from)) return 10;
                                    return -10;
                                };

                                // 3. 拦截底层的硬编码身份判断 (部分卡牌或技能不走 attitude 而是直调 isFriendOf)
                                puppet.isFriendOf = function (target) {
                                    return this.storage.ms_fanhun_teammates.contains(target) || target === this;
                                };
                                puppet.isEnemyOf = function (target) {
                                    return !this.isFriendOf(target);
                                };
                                // ==========================================

                                game.log(player, '减少了', lose_num, '点体力上限，在', spawn_pos, '的下家召唤了体力上限为', lose_num, '的', '#y【人偶】');

                                puppet.clearSkills(true);
                                puppet.addSkill("ms_fanhun_puppet_logic");
                                puppet.addSkill("ms_fanhun_change");
                                player.addSkill("ms_fanhun_use");

                                // (注意：删掉了之前加的 ms_fanhun_ai_lock 技能，不需要了！)

                                game.arrangePlayers();
                                puppet.draw(4);
                            }
                        }
                    },

                    // 【一技能：回合开始召唤】
                    "ms_fanhun_trigger": {
                        trigger: { global: "roundStart" },
                        filter: function (event, player) {
                            if (player.maxHp <= 1) return false;
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i].is_ms_fanhun_puppet && game.players[i].ms_fanhun_owner === player) return false;
                            }
                            return true;
                        },
                        content: function () {
                            "step 0"
                            var max_lose = player.maxHp - 1;
                            var list = [];
                            for (var i = 1; i <= max_lose; i++) {
                                list.push(i.toString());
                            }
                            list.push("取消");
                            player.chooseControl(list).set('prompt', '每轮开始时：是否发动【返魂】？请选择减少的体力上限点数以召唤人偶');

                            "step 1"
                            if (result.control && result.control !== "取消") {
                                event.lose_num = parseInt(result.control);
                                player.chooseTarget('请选择一个位置：人偶将召唤在该角色的下家', function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    return target === player ? 1 : 0;
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.spawn_pos = result.targets[0];
                                player.chooseTarget('请选择人偶的队友（未选中的角色将被视为人偶的敌人）', [0, game.players.length], function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    return game.hasPlayer(function (current) {
                                        return current === target && current.isFriendOf(player);
                                    }) ? 1 : 0;
                                });
                            } else {
                                event.finish();
                            }

                            "step 3"
                            if (result.bool) {
                                var teammates = result.targets || [];
                                var spawn_pos = event.spawn_pos;
                                var lose_num = event.lose_num;

                                player.loseMaxHp(lose_num);

                                var target_seat = game.players.indexOf(spawn_pos) + 1;
                                if (target_seat > game.players.length) target_seat = game.players.length;
                                var puppet = game.addPlayer(target_seat, player.name);
                                if (typeof puppet.getId === 'function') puppet.getId();

                                puppet.node.name.innerHTML = '人<br>偶';
                                puppet.sex = 'none';
                                puppet.maxHp = lose_num;
                                puppet.hp = lose_num;
                                puppet.group = player.group;
                                puppet.update();

                                puppet.is_ms_fanhun_puppet = true;
                                puppet.ms_fanhun_owner = player;
                                puppet.identityShown = false;

                                // ==========================================
                                // 【终极修复：基于无名杀底层的 AI 态度重写】
                                // ==========================================
                                if (!teammates.contains(player)) teammates.push(player);
                                puppet.storage.ms_fanhun_teammates = teammates;

                                puppet.ai = puppet.ai || {};

                                // 1. 拦截 AI 判定：人偶对其他人的态度
                                puppet.ai.modAttitudeFrom = function (from, to, currentAttitude) {
                                    // from 就是人偶自己，如果在设定的队友名单里，绝对死忠(10)；否则死敌(-10)
                                    if (from.storage.ms_fanhun_teammates.contains(to)) return 10;
                                    return -10;
                                };

                                // 2. 拦截 AI 判定：其他人对人偶的态度
                                puppet.ai.modAttitudeTo = function (from, to, currentAttitude) {
                                    // to 是人偶，让设定的队友不要误伤人偶，非队友则疯狂集火人偶
                                    if (to.storage.ms_fanhun_teammates.contains(from)) return 10;
                                    return -10;
                                };

                                // 3. 拦截底层的硬编码身份判断 (部分卡牌或技能不走 attitude 而是直调 isFriendOf)
                                puppet.isFriendOf = function (target) {
                                    return this.storage.ms_fanhun_teammates.contains(target) || target === this;
                                };
                                puppet.isEnemyOf = function (target) {
                                    return !this.isFriendOf(target);
                                };
                                // ==========================================

                                game.log(player, '减少了', lose_num, '点体力上限，在', spawn_pos, '的下家召唤了体力上限为', lose_num, '的', '#y【人偶】');

                                puppet.clearSkills(true);
                                puppet.addSkill("ms_fanhun_puppet_logic");
                                puppet.addSkill("ms_fanhun_change");
                                player.addSkill("ms_fanhun_use");

                                // (注意：删掉了之前加的 ms_fanhun_ai_lock 技能，不需要了！)

                                game.arrangePlayers();
                                puppet.draw(4);
                            }
                        }
                    },


                    // 【底层衍生技1：人偶专用的静默生死机制】
                    "ms_fanhun_puppet_logic": {
                        charlotte: true,
                        mark: false,
                        group: ["ms_fanhun_puppet_master_die"],
                        trigger: { player: "dieBefore" },
                        forced: true,
                        priority: 100,
                        content: function () {
                            trigger.cancel();
                            var puppet = player;
                            game.log(puppet, '化为尘埃，从场上消散了');

                            // 移除主人的手牌借用权
                            if (puppet.ms_fanhun_owner && puppet.ms_fanhun_owner.hasSkill("ms_fanhun_use")) {
                                puppet.ms_fanhun_owner.removeSkill("ms_fanhun_use");
                            }

                            // 【核心修复：使用无名杀原生的移除玩家接口，彻底解决 UI 排版留空问题】
                            game.removePlayer(puppet);
                            game.arrangePlayers();
                        },
                        subSkill: {
                            master_die: {
                                trigger: { global: "dieAfter" },
                                filter: function (event, player) {
                                    return event.player === player.ms_fanhun_owner;
                                },
                                forced: true,
                                content: function () {
                                    game.log('#y【人偶】', '因召唤者阵亡而随之消散');

                                    // 【核心修复：同上】
                                    game.removePlayer(player);
                                    game.arrangePlayers();
                                }
                            }
                        }
                    },

                    // 【底层衍生技2：主人借用人偶手牌打出】
                    "ms_fanhun_use": {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: "你可以如手牌般使用或打出【人偶】的手牌",
                        },
                        forced: true,
                        popup: false,
                        init: function (player, skill) {
                            var puppet = null;
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i].is_ms_fanhun_puppet && game.players[i].ms_fanhun_owner === player) {
                                    puppet = game.players[i]; break;
                                }
                            }
                            if (!puppet) return;
                            var toRemove = player.getCards("s", function (card) { return card.hasGaintag("人偶的手牌"); });
                            if (toRemove.length > 0) game.deleteFakeCards(toRemove);
                            if (puppet.countCards("h")) {
                                var fakes = game.createFakeCards(puppet.getCards("h"));
                                player.directgains(fakes, null, "人偶的手牌");
                            }
                        },
                        onremove: function (player, skill) {
                            var toRemove = player.getCards("s", function (card) { return card.hasGaintag("人偶的手牌"); });
                            if (toRemove.length > 0) game.deleteFakeCards(toRemove);
                        },
                        trigger: {
                            player: ["useCardBefore", "respondBefore"],
                        },
                        filter: function (event, player) {
                            var fakes = player.getCards("s", function (card) { return card.hasGaintag("人偶的手牌"); });
                            if (event.cards && fakes.length > 0) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (fakes.includes(event.cards[i])) return true;
                                }
                            }
                            return false;
                        },
                        content: function () {
                            var puppet = null;
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i].is_ms_fanhun_puppet && game.players[i].ms_fanhun_owner === player) {
                                    puppet = game.players[i]; break;
                                }
                            }
                            if (!puppet) return;

                            var realCards = puppet.getCards("h");
                            for (var i = 0; i < trigger.cards.length; i++) {
                                var card = trigger.cards[i];
                                if (card.hasGaintag("人偶的手牌")) {
                                    var realCard = realCards.find(function (c) { return c.cardid === card._cardid; });
                                    if (realCard) {
                                        trigger.cards[i] = realCard;
                                        if (trigger.card && trigger.card.cards) {
                                            var idx = trigger.card.cards.indexOf(card);
                                            if (idx !== -1) trigger.card.cards[idx] = realCard;
                                        }
                                    }
                                }
                            }
                        }
                    },

                    // 【底层衍生技3：人偶时刻同步卡牌给主人】
                    "ms_fanhun_change": {
                        charlotte: true,
                        trigger: {
                            global: ["loseEnd", "loseAsyncEnd", "gainEnd", "addToExpansionEnd", "equipEnd", "addJudgeEnd"],
                        },
                        silent: true,
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            var getg = event.getg && event.getg(player);
                            var getl = event.getl && event.getl(player) && event.getl(player).hs;
                            return (getg && getg.length > 0) || (getl && getl.length > 0);
                        },
                        content: function () {
                            var master = player.ms_fanhun_owner;
                            if (!master || !master.hasSkill("ms_fanhun_use")) return;

                            var toAdd = (trigger.getg && trigger.getg(player)) ? trigger.getg(player) : [];
                            var toRemove = (trigger.getl && trigger.getl(player) && trigger.getl(player).hs) ? trigger.getl(player).hs : [];

                            if (toRemove.length > 0) {
                                var fakesToRemove = master.getCards("s", function (card) {
                                    return card.hasGaintag("人偶的手牌") && toRemove.some(function (c) { return c.cardid === card._cardid; });
                                });
                                if (fakesToRemove.length > 0) game.deleteFakeCards(fakesToRemove);
                            }

                            if (toAdd.length > 0) {
                                var newFakes = game.createFakeCards(toAdd);
                                master.directgains(newFakes, null, "人偶的手牌");
                            }
                        }
                    },


                    "ms_qianwang": {
                        audio: 2,
                        trigger: { global: "dieBefore" },
                        forced: true,
                        priority: 110,
                        filter: function (event, player) {
                            return event.player.is_ms_fanhun_puppet &&
                                event.player.ms_fanhun_owner === player &&
                                player.isAlive();
                        },
                        content: function () {
                            // 获取即将死亡的人偶的体力上限
                            var num = trigger.player.maxHp;

                            // 主人增加等量的体力上限
                            player.gainMaxHp(num);

                            // 打印游戏日志
                            game.log(player, '发动了', '#g【技能名】', '，收回了', '#y【人偶】', '的灵魂，增加了', num, '点体力上限');
                        }
                    },

                    //————————————————————————美咲的技能————————————————————————

                    "ms_shuijing": {
                        audio: 2,
                        enable: "phaseUse",
                        // 【AI 注入】：极高优先级的空血利用。空勾玉留着没用，不如换成神级装备栏！
                        ai: {
                            order: 10,
                            result: {
                                player: function (player) {
                                    // 只要有空勾玉，且最大体力大于 1，就极高意愿转化为【镜】栏
                                    if (player.maxHp > player.hp && player.maxHp > 1) return 15;
                                    return 0;
                                }
                            }
                        },
                        // 过滤条件：体力上限必须大于当前体力（即拥有“空勾玉”）
                        filter: function (event, player) {
                            return player.maxHp > player.hp;
                        },
                        content: function () {
                            // 1. 扣减一点体力上限（因为是空勾玉，所以不影响当前体力）
                            player.loseMaxHp(1);

                            // 2. 初始化并增加一个【镜】栏
                            if (!player.storage.ms_jing) player.storage.ms_jing = [];
                            player.storage.ms_jing.push({
                                card: null,   // 存放的牌
                                used: false,  // 本回合是否已经操作过
                                id: 'jing_' + get.id() // 唯一标识
                            });

                            // 3. 赋予玩家【镜栏管理系统】的主技能，并刷新 UI
                            player.addSkill('ms_jing_system');
                            player.markSkill('ms_jing_system');
                            game.log(player, '消耗了一点空体力上限，获得了一个', '#y【镜】', '装备栏');
                        }
                    },

                    "ms_chichu": {
                        audio: 2,
                        // 【被动模式】：受到伤害时防身
                        trigger: { player: "damageBegin4" },
                        filter: function (event, player) {
                            if (!event.source || event.source === player || !event.source.isAlive()) return false;

                            var hasJing = player.storage.ms_jing && player.storage.ms_jing.length > 0;
                            var given = player.storage.ms_given_slots || [];
                            var hasNormal = given.length < 5;

                            return hasJing || hasNormal;
                        },
                        content: function () {
                            "step 0"
                            var list = [];
                            var types = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
                            var names = ['武器栏', '防具栏', '防御马栏', '进攻马栏', '宝物栏'];
                            var given = player.storage.ms_given_slots || [];

                            for (var i = 0; i < types.length; i++) {
                                if (!given.includes(types[i])) list.push(names[i]);
                            }

                            if (player.storage.ms_jing) {
                                for (var i = 0; i < player.storage.ms_jing.length; i++) {
                                    list.push('镜栏' + (i + 1));
                                }
                            }
                            list.push('取消');

                            player.chooseControl(list).set('prompt', '是否发动【迟躇】？交出一个装备栏给 ' + get.translation(trigger.source) + '，以防止此次伤害').set('ai', function () {
                                // 【AI 注入】：精明的生死算计
                                var player = _status.event.player;
                                var source = _status.event.getTrigger().source;
                                var num = _status.event.getTrigger().num;
                                var controls = _status.event.controls;
                                var att = get.attitude(player, source);

                                // 1. 如果是队友造成的伤害（比如南蛮万箭），那简直是双赢！送个装备栏给队友还能免伤，必发动！
                                if (att > 0) return controls[0];

                                // 2. 如果是敌人造成的伤害，等于割肉资敌。除非会被打死，或者伤害极高(>=2)，否则宁愿掉血也不给装备栏！
                                if (player.hp <= num || num >= 2) {
                                    // 如果非要给敌人，优先给最没用的普通栏，把核心的【镜】栏留着
                                    if (controls.includes('宝物栏')) return '宝物栏';
                                    if (controls.includes('进攻马栏')) return '进攻马栏';
                                    if (controls.includes('防御马栏')) return '防御马栏';
                                    if (controls.includes('武器栏')) return '武器栏';
                                    if (controls.includes('防具栏')) return '防具栏';
                                    return controls[0];
                                }

                                return '取消';
                            });

                            "step 1"
                            if (result.control && result.control !== '取消') {
                                var choice = result.control;
                                var source = trigger.source;

                                // ================= 交易【镜栏】逻辑 =================
                                if (choice.indexOf('镜栏') !== -1) {
                                    var index = parseInt(choice.replace('镜栏', '')) - 1;
                                    var slot = player.storage.ms_jing.splice(index, 1)[0];
                                    lib.skill.ms_jing_system.applySlotEffects(player);
                                    if (player.storage.ms_jing.length === 0) player.unmarkSkill('ms_jing_system');

                                    if (!source.storage.ms_jing) source.storage.ms_jing = [];
                                    source.storage.ms_jing.push(slot);
                                    source.addSkill('ms_jing_system');
                                    source.markSkill('ms_jing_system');
                                    lib.skill.ms_jing_system.applySlotEffects(source);

                                    game.log(player, '发动了', '#g【迟躇】', '，将一个', '#y【镜】', '栏交给了', source);
                                }
                                // ================= 交易【普通装备栏】逻辑 =================
                                else {
                                    var names = ['武器栏', '防具栏', '防御马栏', '进攻马栏', '宝物栏'];
                                    var types = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
                                    var subtype = types[names.indexOf(choice)];

                                    if (!player.storage.ms_given_slots) player.storage.ms_given_slots = [];
                                    player.storage.ms_given_slots.push(subtype);

                                    var equipCard = player.getEquip(subtype);
                                    if (equipCard) player.discard(equipCard);

                                    if (player.disableEquip) {
                                        player.disableEquip(subtype);
                                    } else {
                                        player.addSkill('ms_disable_equip_mod');
                                    }

                                    if (!source.storage.ms_extra_equips) source.storage.ms_extra_equips = {};
                                    if (!source.storage.ms_extra_equips[subtype]) source.storage.ms_extra_equips[subtype] = 0;
                                    source.storage.ms_extra_equips[subtype]++;
                                    source.addSkill('ms_extra_equip_mod');

                                    game.log(player, '发动了', '#g【迟躇】', '，废除了自己的', '#y【' + choice + '】', '并将其交给了', source);
                                }

                                trigger.cancel();
                                game.log('本次伤害被防止了！');
                            }
                        },
                        group: ["ms_chichu_active"]
                    },

                    "ms_chichu_active": {
                        // 【主动模式】：出牌阶段可以主动送任意装备栏（包括普通栏和镜栏）
                        enable: "phaseUse",
                        ai: {
                            order: 7,
                            result: {
                                target: function (player, target) {
                                    var att = get.attitude(player, target);
                                    if (att > 0) {
                                        var given = player.storage.ms_given_slots || [];
                                        var jing = player.storage.ms_jing || [];
                                        var remaining = (5 - given.length) + jing.length;
                                        // 如果自己装备栏富余（>=3个），主动送给核心队友提供极大增益
                                        if (remaining >= 3) return Math.min(15, 5 + att);
                                    }
                                    return 0;
                                }
                            }
                        },
                        filter: function (event, player) {
                            var hasJing = player.storage.ms_jing && player.storage.ms_jing.length > 0;
                            var given = player.storage.ms_given_slots || [];
                            var hasNormal = given.length < 5;
                            return hasJing || hasNormal;
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget('发动【迟躇】：请选择一名其他角色，交给他一个装备栏', function (card, player, target) {
                                return target !== player;
                            }).set('ai', function (target) {
                                return get.attitude(player, target) > 0 ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool && result.targets.length > 0) {
                                event.target = result.targets[0];
                                var list = [];
                                var types = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
                                var names = ['武器栏', '防具栏', '防御马栏', '进攻马栏', '宝物栏'];
                                var given = player.storage.ms_given_slots || [];

                                for (var i = 0; i < types.length; i++) {
                                    if (!given.includes(types[i])) list.push(names[i]);
                                }
                                if (player.storage.ms_jing) {
                                    for (var i = 0; i < player.storage.ms_jing.length; i++) {
                                        list.push('镜栏' + (i + 1));
                                    }
                                }
                                list.push('取消');
                                player.chooseControl(list).set('prompt', '请选择要交给 ' + get.translation(event.target) + ' 的装备栏').set('ai', function () {
                                    // 【AI 注入】：主动送队友，优先送不太重要的栏位，把武器/防具留给自己
                                    var controls = _status.event.controls;
                                    if (controls.includes('宝物栏')) return '宝物栏';
                                    if (controls.includes('进攻马栏')) return '进攻马栏';
                                    if (controls.includes('防御马栏')) return '防御马栏';
                                    if (controls.includes('武器栏')) return '武器栏';
                                    if (controls.includes('防具栏')) return '防具栏';
                                    return controls[0];
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control && result.control !== '取消') {
                                var choice = result.control;
                                var target = event.target;

                                if (choice.indexOf('镜栏') !== -1) {
                                    var index = parseInt(result.control.replace('镜栏', '')) - 1;
                                    var slot = player.storage.ms_jing.splice(index, 1)[0];
                                    lib.skill.ms_jing_system.applySlotEffects(player);
                                    if (player.storage.ms_jing.length === 0) player.unmarkSkill('ms_jing_system');

                                    if (!target.storage.ms_jing) target.storage.ms_jing = [];
                                    target.storage.ms_jing.push(slot);
                                    target.addSkill('ms_jing_system');
                                    target.markSkill('ms_jing_system');
                                    lib.skill.ms_jing_system.applySlotEffects(target);

                                    game.log(player, '发动了', '#g【迟躇】', '，主动将一个', '#y【镜】', '栏交给了', target);
                                } else {
                                    var names = ['武器栏', '防具栏', '防御马栏', '进攻马栏', '宝物栏'];
                                    var types = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
                                    var subtype = types[names.indexOf(choice)];

                                    if (!player.storage.ms_given_slots) player.storage.ms_given_slots = [];
                                    player.storage.ms_given_slots.push(subtype);

                                    var equipCard = player.getEquip(subtype);
                                    if (equipCard) player.discard(equipCard);

                                    if (player.disableEquip) {
                                        player.disableEquip(subtype);
                                    } else {
                                        player.addSkill('ms_disable_equip_mod');
                                    }

                                    if (!target.storage.ms_extra_equips) target.storage.ms_extra_equips = {};
                                    if (!target.storage.ms_extra_equips[subtype]) target.storage.ms_extra_equips[subtype] = 0;
                                    target.storage.ms_extra_equips[subtype]++;
                                    target.addSkill('ms_extra_equip_mod');

                                    game.log(player, '发动了', '#g【迟躇】', '，主动废除了自己的', '#y【' + choice + '】', '并使其交给了', target);
                                }
                            }
                        }
                    },

                    // ================= ★ 底层扩展系统：增加装备上限 ★ =================
                    "ms_extra_equip_mod": {
                        charlotte: true,
                        mod: {
                            maxEquip: function (player, subtype, num) {
                                if (player.storage.ms_extra_equips && player.storage.ms_extra_equips[subtype]) {
                                    return num + player.storage.ms_extra_equips[subtype];
                                }
                            }
                        }
                    },

                    "ms_disable_equip_mod": {
                        charlotte: true,
                        mod: {
                            maxEquip: function (player, subtype, num) {
                                if (player.storage.ms_given_slots && player.storage.ms_given_slots.includes(subtype)) {
                                    return 0;
                                }
                            }
                        }
                    },

                    // ================= 以下为底层【镜】栏支撑系统 =================

                    "ms_jing_system": {
                        mark: true,
                        intro: {
                            name: "【镜】装备栏",
                            markcount: function (storage, player) {
                                return player.storage.ms_jing ? player.storage.ms_jing.length : 0;
                            },
                            content: function (storage, player) {
                                var jing = player.storage.ms_jing;
                                if (!jing || jing.length === 0) return "当前没有镜栏";
                                var str = "";
                                for (var i = 0; i < jing.length; i++) {
                                    var slot = jing[i];
                                    str += "镜栏 " + (i + 1) + "：";
                                    if (slot.card) {
                                        var suitStr = get.translation(get.suit(slot.card));
                                        var numStr = get.number(slot.card);
                                        var nameStr = get.translation(slot.card.name);
                                        str += suitStr + numStr + "【" + nameStr + "】";
                                    } else {
                                        str += "空";
                                    }
                                    if (slot.used) str += " <font color='orange'>(已操作)</font>";
                                    str += "<br>";
                                }
                                return str;
                            }
                        },
                        enable: "phaseUse",
                        // 【AI 注入】：极高意愿去使用镜栏
                        ai: {
                            order: 8.5,
                            result: {
                                player: function (player) {
                                    if (player.countCards('he') > 0) return 15;
                                    return 0;
                                }
                            }
                        },
                        filter: function (event, player) {
                            if (!player.storage.ms_jing || player.storage.ms_jing.length === 0) return false;
                            for (var i = 0; i < player.storage.ms_jing.length; i++) {
                                if (!player.storage.ms_jing[i].used) return true;
                            }
                            return false;
                        },
                        content: function () {
                            "step 0"
                            var list = [];
                            for (var i = 0; i < player.storage.ms_jing.length; i++) {
                                if (!player.storage.ms_jing[i].used) {
                                    list.push("镜栏" + (i + 1));
                                }
                            }
                            list.push("取消");
                            player.chooseControl(list).set('prompt', '请选择要放入牌的【镜】栏（每栏每阶段限一次）').set('ai', function () {
                                return _status.event.controls[0]; // AI 默认选第一个空闲的镜栏
                            });

                            "step 1"
                            if (result.control && result.control !== "取消") {
                                event.slot_index = parseInt(result.control.replace("镜栏", "")) - 1;
                                player.chooseCard('he', 1, '请选择一张牌置于该镜栏中（将顶掉原有的牌）').set('ai', function (card) {
                                    // 【AI 注入】：聪明的塞牌逻辑。装备收益最大（15），锦囊被动补牌（12），基本牌当印卡机（10）
                                    var type = get.type(card);
                                    if (type === 'equip') return 15;
                                    if (type === 'trick' || type === 'delay') return 12;
                                    if (type === 'basic') return 10;
                                    return 5;
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.cards && result.cards.length > 0) {
                                var card = result.cards[0];
                                var slot = player.storage.ms_jing[event.slot_index];

                                player.lose(card, ui.special, 'to_jing');

                                if (slot.card) {
                                    ui.discardPile.appendChild(slot.card);
                                    game.log(slot.card, '被移出了', '#y【镜】', '栏并进入弃牌堆');
                                }

                                game.log(player, '将', card, '置于了', '#y【镜】', '装备栏');

                                slot.card = card;
                                slot.used = true;
                                player.markSkill('ms_jing_system');

                                lib.skill.ms_jing_system.applySlotEffects(player);
                            }
                        },
                        group: ["ms_jing_reset_used", "ms_jing_trick", "ms_jing_trick_reset"],

                        applySlotEffects: function (player) {
                            player.removeSkill('ms_jing_equip_mod');
                            player.removeAdditionalSkill('ms_jing_viewas_group');
                            player.removeAdditionalSkill('ms_jing_equips');

                            var slots = player.storage.ms_jing;
                            if (!slots || slots.length === 0) {
                                player.storage.ms_jing_trick_suits = [];
                                player.storage.ms_jing_equip_cards = [];
                                return;
                            }

                            var basics = [];
                            var trick_suits = [];
                            var equip_skills = [];
                            var equip_cards = [];

                            for (var i = 0; i < slots.length; i++) {
                                var c = slots[i].card;
                                if (c) {
                                    var type = get.type(c);
                                    if (type === 'basic') {
                                        basics.push(c);
                                    } else if (type === 'trick' || type === 'delay') {
                                        trick_suits.push(get.suit(c));
                                    } else if (type === 'equip') {
                                        equip_cards.push(c);
                                        var info = lib.card[c.name];
                                        if (info && info.skills) {
                                            equip_skills = equip_skills.concat(info.skills);
                                        }
                                    }
                                }
                            }

                            if (basics.length > 0) {
                                var viewas_skills = [];
                                for (var i = 0; i < basics.length; i++) {
                                    (function (cardName, cardSuit, cardNature) {
                                        var skill_id = 'ms_jing_viewas_' + cardName + '_' + cardSuit;
                                        if (!lib.skill[skill_id]) {
                                            lib.skill[skill_id] = {
                                                enable: ["chooseToUse", "chooseToRespond"],
                                                viewAs: { name: cardName, nature: cardNature },
                                                filterCard: function (card, player) { return get.suit(card) === cardSuit; },
                                                position: "hes",
                                                prompt: "【镜】栏效果：将一张" + get.translation(cardSuit) + "花色的牌当做【" + get.translation(cardName) + "】使用",
                                                check: function (card) { return 6 - get.value(card); }
                                            };
                                            lib.translate[skill_id] = "镜·" + get.translation(cardName);
                                        }
                                        viewas_skills.push(skill_id);
                                    })(basics[i].name, get.suit(basics[i]), basics[i].nature);
                                }
                                player.addAdditionalSkill('ms_jing_viewas_group', viewas_skills);
                            }

                            player.storage.ms_jing_trick_suits = trick_suits;

                            if (equip_skills.length > 0) {
                                player.addAdditionalSkill('ms_jing_equips', equip_skills);
                            }
                            if (equip_cards.length > 0) {
                                player.storage.ms_jing_equip_cards = equip_cards;
                                player.addSkill('ms_jing_equip_mod');
                            }
                        }
                    },

                    "ms_jing_reset_used": {
                        trigger: { player: "phaseUseBegin" },
                        forced: true, popup: false,
                        content: function () {
                            if (player.storage.ms_jing) {
                                for (var i = 0; i < player.storage.ms_jing.length; i++) {
                                    player.storage.ms_jing[i].used = false;
                                }
                                player.markSkill('ms_jing_system');
                            }
                        }
                    },

                    "ms_jing_trick_reset": {
                        trigger: { global: "phaseBefore" },
                        forced: true, popup: false,
                        content: function () {
                            player.storage.ms_jing_trick_history = [];
                        }
                    },

                    "ms_jing_trick": {
                        trigger: { player: "loseAfter" },
                        forced: true,
                        filter: function (event, player) {
                            var suits = player.storage.ms_jing_trick_suits;
                            if (!suits || suits.length === 0) return false;
                            var history = player.storage.ms_jing_trick_history || [];
                            for (var i = 0; i < event.cards.length; i++) {
                                var suit = get.suit(event.cards[i]);
                                if (suits.includes(suit) && !history.includes(suit)) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        content: function () {
                            var suits = player.storage.ms_jing_trick_suits;
                            var history = player.storage.ms_jing_trick_history || [];
                            var triggered_suits = [];

                            for (var i = 0; i < trigger.cards.length; i++) {
                                var suit = get.suit(trigger.cards[i]);
                                if (suits.includes(suit) && !history.includes(suit)) {
                                    history.push(suit);
                                    triggered_suits.push(suit);
                                }
                            }
                            player.storage.ms_jing_trick_history = history;

                            if (triggered_suits.length > 0) {
                                game.log(player, '触发了', '#y【镜】', '栏的锦囊被动效果');
                                player.draw(2 * triggered_suits.length);
                            }
                        }
                    },

                    "ms_jing_equip_mod": {
                        charlotte: true,
                        mod: {
                            attackFrom: function (from, to, distance) {
                                var cards = from.storage.ms_jing_equip_cards;
                                if (!cards) return;
                                var max_range = 0;
                                for (var i = 0; i < cards.length; i++) {
                                    var info = lib.card[cards[i].name];
                                    if (info && info.subtype === 'equip1' && info.distance && info.distance.attackFrom) {
                                        max_range = Math.max(max_range, info.distance.attackFrom);
                                    }
                                }
                                if (max_range > 0) return Math.max(distance, max_range - 1);
                            },
                            globalFrom: function (from, to, distance) {
                                var cards = from.storage.ms_jing_equip_cards;
                                if (!cards) return;
                                var mod = 0;
                                for (var i = 0; i < cards.length; i++) {
                                    var info = lib.card[cards[i].name];
                                    if (info && info.subtype === 'equip4' && info.distance && info.distance.globalFrom) {
                                        mod += info.distance.globalFrom;
                                    }
                                }
                                return distance + mod;
                            },
                            globalTo: function (from, to, distance) {
                                var cards = from.storage.ms_jing_equip_cards;
                                if (!cards) return;
                                var mod = 0;
                                for (var i = 0; i < cards.length; i++) {
                                    var info = lib.card[cards[i].name];
                                    if (info && info.subtype === 'equip3' && info.distance && info.distance.globalTo) {
                                        mod += info.distance.globalTo;
                                    }
                                }
                                return distance + mod;
                            }
                        }
                    },


                    "ms_qitian": {
                        audio: 2,
                        enable: "phaseUse",
                        // 【AI 注入】：精准预判与防死循环判定中枢
                        ai: {
                            order: 9,
                            result: {
                                player: function (player) {
                                    // 【阳】状态：将场上一张装备当锦囊牌使用
                                    if (!player.storage.ms_qitian) {
                                        // 1. 检查场上是否有可以动的装备（优先敌人的装备，其次自己的废装备）
                                        var enemiesWithEquip = game.hasPlayer(function (current) {
                                            return get.attitude(player, current) < 0 && current.countCards('e') > 0;
                                        });
                                        var selfHasEquip = player.countCards('e') > 0;

                                        if (!enemiesWithEquip && !selfHasEquip) return 0; // 场上无合适装备，绝对不出手

                                        // 2. 检查是否有当前可用的普通锦囊牌
                                        var used_tricks = player.getHistory('useCard', function (evt) {
                                            return get.type(evt.card) === 'trick';
                                        }).map(function (evt) { return evt.card.name; });

                                        var valid_tricks = ['wuzhong', 'juedou', 'huogong', 'shunshou', 'guohe', 'jiedao', 'nanman', 'wanjian', 'taoyuan', 'wugu', 'tiesuo'];
                                        var available = valid_tricks.filter(function (name) { return !used_tricks.includes(name); });

                                        if (available.length === 0) return 0; // 本回合锦囊已全部用过，无法印牌

                                        // 3. 极化收益：剥夺敌人装备（80分）或利用自己废装备（40分）
                                        if (enemiesWithEquip) return 80;
                                        if (selfHasEquip) return 40;
                                        return 0;
                                    }
                                    // 【阴】状态：废除敌人的【镜】栏并弃置其2张牌
                                    else {
                                        var hasEnemyJing = game.hasPlayer(function (current) {
                                            return get.attitude(player, current) < 0 && current.storage.ms_jing && current.storage.ms_jing.length > 0;
                                        });
                                        if (hasEnemyJing) return 100; // 超高优先级撕碎敌人的镜栏！

                                        // 没有敌人有镜栏时绝对不发动（绝不废除队友的镜栏）
                                        return 0;
                                    }
                                }
                            }
                        },
                        mark: true,
                        marktext: "☯",
                        init: function (player, skill) {
                            if (typeof player.storage[skill] !== 'boolean') {
                                player.storage[skill] = false;
                            }
                            player.markSkill(skill);
                        },
                        intro: {
                            name: "祈天 (转换技)",
                            content: function (storage, player) {
                                if (!storage) {
                                    return "当前状态：【阳】你可以将场上一张装备牌当本回合未使用过的普通锦囊牌使用。";
                                }
                                return "当前状态：【阴】你可以废除一名角色的一个【镜】栏，并弃置其两张牌。";
                            }
                        },
                        filter: function (event, player) {
                            // 【阳】状态拦截
                            if (!player.storage.ms_qitian) {
                                var hasEquip = false;
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i].countCards('e') > 0) {
                                        hasEquip = true;
                                        break;
                                    }
                                }
                                if (!hasEquip) return false;

                                var used_tricks = player.getHistory('useCard', function (evt) {
                                    return get.type(evt.card) === 'trick';
                                }).map(function (evt) { return evt.card.name; });

                                var valid_tricks = ['wuzhong', 'juedou', 'huogong', 'shunshou', 'guohe', 'jiedao', 'nanman', 'wanjian', 'taoyuan', 'wugu', 'tiesuo'];
                                var available = valid_tricks.filter(function (name) { return !used_tricks.includes(name); });

                                return available.length > 0;
                            }
                            // 【阴】状态拦截
                            else {
                                for (var i = 0; i < game.players.length; i++) {
                                    if (game.players[i].storage.ms_jing && game.players[i].storage.ms_jing.length > 0) return true;
                                }
                                return false;
                            }
                        },
                        content: function () {
                            "step 0"
                            if (!player.storage.ms_qitian) {
                                var used_tricks = player.getHistory('useCard', function (evt) {
                                    return get.type(evt.card) === 'trick';
                                }).map(function (evt) { return evt.card.name; });
                                var valid_tricks = ['wuzhong', 'juedou', 'huogong', 'shunshou', 'guohe', 'jiedao', 'nanman', 'wanjian', 'taoyuan', 'wugu', 'tiesuo'];
                                var available = valid_tricks.filter(function (name) { return !used_tricks.includes(name); });

                                available.push('cancel2');
                                player.chooseControl(available).set('prompt', '发动【祈天】：请选择你要使用的普通锦囊牌').set('ai', function () {
                                    var controls = _status.event.controls;
                                    var player = _status.event.player;

                                    // 【大尺度锦囊选择 AI】
                                    // 1. 无中生有（无脑第一优先，极大收益）
                                    if (controls.includes('wuzhong')) return 'wuzhong';

                                    // 2. 顺手牵羊 / 过河拆桥（检查是否有目标）
                                    if (controls.includes('shunshou') && player.hasValueTarget({ name: 'shunshou', isCard: true })) return 'shunshou';
                                    if (controls.includes('guohe') && player.hasValueTarget({ name: 'guohe', isCard: true })) return 'guohe';

                                    // 3. 核心输出与 AOE 锦囊
                                    if (controls.includes('nanman')) return 'nanman';
                                    if (controls.includes('wanjian')) return 'wanjian';
                                    if (controls.includes('juedou') && player.hasValueTarget({ name: 'juedou', isCard: true })) return 'juedou';
                                    if (controls.includes('huogong') && player.hasValueTarget({ name: 'huogong', isCard: true })) return 'huogong';

                                    // 4. 辅助与保底锦囊
                                    if (controls.includes('taoyuan') && player.hasValueTarget({ name: 'taoyuan', isCard: true })) return 'taoyuan';
                                    if (controls.includes('tiesuo')) return 'tiesuo';
                                    if (controls.includes('wugu')) return 'wugu';
                                    if (controls.includes('jiedao')) return 'jiedao';

                                    return 'cancel2';
                                });
                            } else {
                                player.chooseTarget('发动【祈天】：废除一名角色的一个【镜】栏，并弃置其两张牌', function (card, player, target) {
                                    return target.storage.ms_jing && target.storage.ms_jing.length > 0;
                                }).set('ai', function (target) {
                                    var player = _status.event.player;
                                    var att = get.attitude(player, target);
                                    // 极大尺度敌我分明：只撕敌人（att < 0）的镜栏，分值 100！绝对不碰队友！
                                    if (att < 0) return 100 - att * 10;
                                    return -100;
                                });
                            }

                            "step 1"
                            if (!player.storage.ms_qitian) {
                                if (result.control && result.control !== "cancel2") {
                                    event.trick_name = result.control;
                                    var equips = [];
                                    for (var i = 0; i < game.players.length; i++) {
                                        equips = equips.concat(game.players[i].getCards('e'));
                                    }
                                    player.chooseButton(['请选择一张场上的装备牌', equips], 1).set('ai', function (button) {
                                        var player = _status.event.player;
                                        var card = button.link;
                                        if (!card) return 0;

                                        var owner = get.owner(card);
                                        if (!owner) return 0;

                                        var att = get.attitude(player, owner);

                                        // 敌人（att < 0）：极大尺度剥夺强力装备（分值 50 + 装备价值）
                                        if (att < 0) {
                                            return 50 + get.value(card, owner);
                                        }

                                        // 自己（owner === player）：牺牲自己价值最低的装备（20 - 装备价值）
                                        if (owner === player) {
                                            return Math.max(1, 20 - get.value(card, player));
                                        }

                                        // 队友（att > 0 且 owner !== player）：绝对不碰队友装备！
                                        return -100;
                                    });
                                } else {
                                    event.finish();
                                }
                            } else {
                                if (result.bool && result.targets && result.targets.length > 0) {
                                    event.target = result.targets[0];
                                    var list = [];
                                    for (var i = 0; i < event.target.storage.ms_jing.length; i++) {
                                        list.push('镜栏' + (i + 1));
                                    }
                                    list.push('cancel2');
                                    player.chooseControl(list).set('prompt', '请选择要废除的【镜】栏').set('ai', function () {
                                        return _status.event.controls[0]; // 默认废除第一个镜栏
                                    });
                                } else {
                                    event.finish();
                                }
                            }

                            "step 2"
                            if (!player.storage.ms_qitian) {
                                if (result.bool && result.links && result.links.length > 0) {
                                    event.equip_card = result.links[0];
                                    var vcard = { name: event.trick_name, cards: [event.equip_card], isCard: true };
                                    player.chooseUseTarget(vcard, '将 ' + get.translation(event.equip_card) + ' 当【' + get.translation(event.trick_name) + '】使用', false);
                                } else {
                                    event.finish();
                                }
                            } else {
                                if (result.control && result.control !== 'cancel2') {
                                    var index = parseInt(result.control.replace('镜栏', '')) - 1;
                                    var target = event.target;

                                    var slot = target.storage.ms_jing.splice(index, 1)[0];
                                    if (slot.card) {
                                        ui.discardPile.appendChild(slot.card);
                                        game.log(slot.card, '随', '#y【镜】', '栏一同被废除并进入弃牌堆');
                                    }

                                    lib.skill.ms_jing_system.applySlotEffects(target);
                                    if (target.storage.ms_jing.length === 0) target.unmarkSkill('ms_jing_system');

                                    game.log(player, '发动了', '#g【祈天】', '，废除了', target, '的一个', '#y【镜】', '栏');

                                    event.success_state2 = true;

                                    if (target.countCards('he') > 0) {
                                        player.discardPlayerCard(target, 'he', 2, true);
                                    }
                                } else {
                                    event.finish();
                                }
                            }

                            "step 3"
                            if (!player.storage.ms_qitian) {
                                if (result.bool) {
                                    if (event.equip_card && get.position(event.equip_card) === 'e') {
                                        var owner = get.owner(event.equip_card);
                                        if (owner) {
                                            owner.discard(event.equip_card);
                                        } else {
                                            event.equip_card.discard();
                                        }
                                    }
                                    player.storage.ms_qitian = true;
                                    player.markSkill('ms_qitian');
                                    game.log(player, '的', '#g【祈天】', '状态转换为了', '#b【阴】');
                                }
                            } else {
                                if (event.success_state2) {
                                    player.storage.ms_qitian = false;
                                    player.markSkill('ms_qitian');
                                    game.log(player, '的', '#g【祈天】', '状态转换为了', '#r【阳】');
                                }
                            }
                        }
                    },
                    //————————————————————————入莉的技能————————————————————————

                    "ms_lianmeng": {
                        audio: 2,
                        trigger: {
                            player: "phaseUseEnd",
                        },
                        filter: function (event, player) {
                            return player.countCards('h') > 0 && game.players.length > 1;
                        },
                        direct: true,
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('ms_lianmeng'), '将所有手牌交给一名其他角色', function (card, player, target) {
                                return target != player;
                            }).set('ai', function (target) {
                                return get.attitude(_status.event.player, target);
                            });
                            "step 1"
                            if (result.bool && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                player.logSkill('ms_lianmeng', target);
                                var cards = player.getCards('h');
                                target.gain(cards, player, 'give');

                                target.addSkill('ms_lianmeng_effect');
                                if (!target.storage.ms_lianmeng_effect) {
                                    target.storage.ms_lianmeng_effect = {};
                                }
                                target.storage.ms_lianmeng_effect.origin = player;
                            }
                        },
                    },
                    "ms_lianmeng_effect": {
                        chuanjiu: true,
                        // 【优化】加入 dieAfter，防止携带标记的玩家在传牌前阵亡导致标记消失、链条断裂
                        trigger: {
                            player: ["phaseUseEnd", "dieAfter"],
                        },
                        forced: true,
                        popup: false,
                        content: function () {
                            "step 0"
                            var origin = player.storage.ms_lianmeng_effect ? player.storage.ms_lianmeng_effect.origin : null;
                            var next = player.getNext();

                            // 【优化】增加 origin.isAlive() 判断。如果最初的发起者已经阵亡，自动终止传花循环
                            if (!origin || !origin.isAlive() || next == origin) {
                                if (origin && origin.isAlive() && next == origin && player.countCards('he') > 0) {
                                    player.line(next, 'gold');
                                    var cards = player.getCards('he');
                                    next.gain(cards, player, 'give');
                                }
                                player.removeSkill('ms_lianmeng_effect');
                                delete player.storage.ms_lianmeng_effect;
                            } else {
                                if (player.countCards('he') > 0) {
                                    player.line(next, 'gold');
                                    var cards = player.getCards('he');
                                    next.gain(cards, player, 'give');
                                }

                                player.removeSkill('ms_lianmeng_effect');
                                delete player.storage.ms_lianmeng_effect;

                                next.addSkill('ms_lianmeng_effect');
                                if (!next.storage.ms_lianmeng_effect) {
                                    next.storage.ms_lianmeng_effect = {};
                                }
                                next.storage.ms_lianmeng_effect.origin = origin;
                            }
                        }
                    },
                    "ms_shenlou": {
                        audio: 2,
                        trigger: {
                            // 【优化】移除无效的 hujiaEnd，将体力上限变化拆分为标准的 gainMaxHpEnd 和 loseMaxHpEnd
                            player: ["damageEnd", "loseHpEnd", "recoverEnd", "gainMaxHpEnd", "loseMaxHpEnd"],
                        },
                        filter: function (event, player) {
                            var currentEmpty = player.maxHp - player.hp;
                            var oldEmpty = currentEmpty;

                            // 防御性编程：获取变化数值，标准事件一般自带 event.num，若无则默认为 1
                            var num = typeof event.num == 'number' ? event.num : 1;

                            if (event.name == 'damage' || event.name == 'loseHp') {
                                oldEmpty -= num;
                            } else if (event.name == 'recover') {
                                oldEmpty += num;
                            } else if (event.name == 'gainMaxHp') {
                                // 【优化】增加体力上限时，原本的上限比现在少，旧空勾玉 = 当前空勾玉 - 变化量
                                oldEmpty -= num;
                            } else if (event.name == 'loseMaxHp') {
                                // 扣减体力上限时，原本的上限比现在多，旧空勾玉 = 当前空勾玉 + 变化量
                                oldEmpty += num;
                            }

                            return currentEmpty != oldEmpty;
                        },
                        frequent: true,
                        content: function () {
                            player.draw();
                        },
                        ai: {
                            maixie: true,
                            threaten: 1.5
                        }
                    },

                    ms_dianxing: {
                        audio: 2,
                        trigger: {
                            player: ["phaseZhunbeiBegin", "damageEnd"] // 时机：回合开始时（准备阶段开始），或受到伤害后
                        },
                        direct: true, // 使用 direct，我们要自己弹出一个选择框
                        filter: function (event, player) {
                            // 这个技能任何时候都能触发，除非玩家不想发动
                            return true;
                        },
                        content: function () {
                            "step 0"
                            // 1. 初始化技能顺序列表 和 进度记录
                            var skillList = ['ms_shuijing', 'ms_liuhua', 'ms_fanhun', 'ms_xiebo', 'ms_kuishi'];

                            // 如果玩家是第一次发动，初始化进度为 0
                            if (player.storage.ms_dianxing === undefined) {
                                player.storage.ms_dianxing = 0;
                            }

                            var progress = player.storage.ms_dianxing;

                            // 2. 构建选项
                            var controls = ['加一点体力上限'];
                            var skillChoice = '';

                            // 如果还没拿满5个技能，就提供获取技能的选项
                            if (progress < skillList.length) {
                                var nextSkill = skillList[progress];
                                skillChoice = '获得技能【' + get.translation(nextSkill) + '】';
                                controls.push(skillChoice);
                            }

                            controls.push('取消'); // 提供不发动的权利

                            // 3. 弹出提示让玩家选择
                            var promptStr = '点醒：请选择一项效果';
                            player.chooseControl(controls).set('prompt', promptStr).set('ai', function () {
                                // AI 使用逻辑：优先选技能。如果技能全拿满了，就选加体力上限
                                if (controls.includes(skillChoice)) return skillChoice;
                                return '加一点体力上限';
                            });

                            "step 1"
                            // 4. 根据玩家的选择进行结算
                            if (result.control === '加一点体力上限') {
                                player.logSkill('ms_dianxing'); // 播放点醒的发动特效和配音

                                // 增加1点体力上限
                                player.gainMaxHp(1);
                                game.log(player, '发动了', '#g【点醒】', '，增加了 1 点体力上限');

                            } else if (result.control === '取消' || !result.control) {
                                // 取消则直接结束事件
                                event.finish();

                            } else {
                                // 如果选择的是获得技能
                                player.logSkill('ms_dianxing');

                                var skillList = ['ms_shuijing', 'ms_liuhua', 'ms_fanhun', 'ms_xiebo', 'ms_kuishi'];
                                var progress = player.storage.ms_dianxing;
                                var nextSkill = skillList[progress];

                                // 获得该技能
                                player.addSkill(nextSkill);

                                // 进度 +1，下次发动就会拿列表里的下一个技能
                                player.storage.ms_dianxing++;

                                // 播放飘字特效和记录日志
                                player.popup(nextSkill);
                                game.log(player, '发动了', '#g【点醒】', '，获得了技能', '#g【' + get.translation(nextSkill) + '】');
                            }
                        }
                    },


                    // 主技能：溃世
                    "ms_kuishi": {
                        audio: 2,
                        enable: "phaseUse",
                        limited: true,
                        mark: true,
                        skillAnimation: true,
                        animationColor: "thunder",
                        intro: {
                            content: "limited"
                        },
                        filter: function (event, player) {
                            return !player.hasSkill('ms_kuishi_used') && player.maxHp > 0;
                        },
                        content: function () {
                            "step 0"
                            var list = [];
                            for (var i = 1; i <= player.maxHp; i++) {
                                list.push(i.toString());
                            }
                            list.push("取消");
                            player.chooseControl(list).set('prompt', '溃世：请选择你要减少的体力上限点数');

                            "step 1"
                            if (result.control && result.control !== "取消") {
                                event.lose_num = parseInt(result.control);
                                player.chooseTarget(get.prompt('ms_kuishi'), '对一名角色造成' + event.lose_num + '点闪电伤害', function (card, player, target) {
                                    return true;
                                }).set('ai', function (target) {
                                    var player = _status.event.player;
                                    // 防止 AI 随意把自己的体力上限扣光自杀
                                    if (event.lose_num >= player.maxHp && player.hp > 1) return 0;
                                    return get.damageEffect(target, player, player, 'thunder') * event.lose_num;
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                // 只有在确认选择了目标后，才正式消耗限定技并播放觉醒特效
                                player.addSkill('ms_kuishi_used');
                                player.awakenSkill('ms_kuishi');

                                var target = result.targets[0];
                                var lose_num = event.lose_num;

                                player.loseMaxHp(lose_num);
                                target.damage(lose_num, 'thunder', player);
                            }
                        }
                    },
                    "ms_kuishi_used": {
                        chuanjiu: true
                    },

                    //协波
                    ms_xiebo: {
                        audio: 2,
                        trigger: { player: "phaseJieshuBegin" },
                        direct: true,
                        filter: function (event, player) {
                            // 算法：只要有 info 翻译描述的技能就是合法技能
                            var skills = player.getSkills();
                            for (var i = 0; i < skills.length; i++) {
                                var skill = skills[i];
                                if (skill === 'ms_xiebo' || skill === 'ms_xiebo_return') continue;
                                if (lib.translate[skill + '_info']) return true;
                            }
                            return false;
                        },
                        content: function () {
                            "step 0"
                            // 1. 选人阶段
                            player.chooseTarget(get.prompt('ms_xiebo'), '选择一名其他角色，交出你的技能（可多选）', function (card, player, target) {
                                return target !== player;
                            }).set('ai', function (target) {
                                return get.attitude(player, target) > 0 ? 1 : 0;
                            });

                            "step 1"
                            if (result.bool) {
                                event.target = result.targets[0];

                                // 2. 初始化合法的备选技能池 和 已选技能池
                                event.validSkills = [];
                                event.selectedSkills = [];

                                var skills = player.getSkills();
                                var blockedPuppetSkills = ['ms_liuhua', 'ms_shenlou', 'ms_lianmeng', 'ms_dianxing', 'ms_fanhun', 'ms_qianwang', 'ms_kuishi', 'ms_kuishi_used'];
                                for (var i = 0; i < skills.length; i++) {
                                    var skill = skills[i];
                                    if (skill === 'ms_xiebo' || skill === 'ms_xiebo_return') continue;
                                    if (event.target && event.target.is_ms_fanhun_puppet && blockedPuppetSkills.indexOf(skill) !== -1) continue;
                                    if (lib.translate[skill + '_info']) {
                                        event.validSkills.push(skill);
                                    }
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            // 3. 构建当前的技能按钮列表（像神张辽一样使用 chooseControl）
                            var controls = event.validSkills.slice(0); // 复制一份备选技能池

                            // 如果备选池空了（技能全被点光了），直接跳到最后一步去发技能
                            if (controls.length === 0) {
                                event.goto(4);
                                return;
                            }

                            // 如果玩家已经选了至少1个技能，提供“完成”按钮；否则提供“取消”按钮
                            if (event.selectedSkills.length > 0) {
                                controls.push('完成');
                            } else {
                                controls.push('取消');
                            }

                            // 动态构建提示语，让玩家知道自己已经选了什么
                            var prompt = '请选择要交给 ' + get.translation(event.target.name) + ' 的技能';
                            if (event.selectedSkills.length > 0) {
                                prompt += '。已选：';
                                for (var i = 0; i < event.selectedSkills.length; i++) {
                                    prompt += '【#g' + get.translation(event.selectedSkills[i]) + '#n】';
                                }
                            }

                            // 弹出技能按钮让玩家点选
                            player.chooseControl(controls).set('prompt', prompt).set('ai', function () {
                                // AI 逻辑：给出一个技能后就点完成
                                if (controls.includes('完成')) return '完成';
                                return controls[0];
                            });

                            "step 3"
                            // 4. 处理玩家的点击结果
                            if (result.control === '完成') {
                                // 选完了，跳到第4步去执行给技能
                                event.goto(4);
                            } else if (result.control === '取消' || !result.control) {
                                // 点取消，直接结束整个技能
                                event.finish();
                            } else {
                                // 玩家点击了一个技能：把它移入“已选列表”，并从“备选列表”中删掉
                                event.selectedSkills.push(result.control);
                                var index = event.validSkills.indexOf(result.control);
                                if (index !== -1) {
                                    event.validSkills.splice(index, 1);
                                }

                                // 【核心机制】：跳转回第2步（step 2），实现不断弹框多选的循环！
                                event.goto(2);
                            }

                            "step 4"
                            // 5. 最终结算阶段（将 selectedSkills 里的技能全部给出去）
                            if (event.selectedSkills && event.selectedSkills.length > 0) {
                                var selectedSkills = event.selectedSkills;
                                player.logSkill('ms_xiebo', event.target);

                                if (!player.storage.ms_xiebo_return) {
                                    player.storage.ms_xiebo_return = [];
                                }

                                for (var i = 0; i < selectedSkills.length; i++) {
                                    var skill = selectedSkills[i];
                                    if (!event.target || !event.target.addSkill) continue;
                                    if (event.target.is_ms_fanhun_puppet) {
                                        var blockedPuppetSkills = ['ms_liuhua', 'ms_shenlou', 'ms_lianmeng', 'ms_dianxing', 'ms_fanhun', 'ms_qianwang', 'ms_kuishi', 'ms_kuishi_used'];
                                        if (blockedPuppetSkills.indexOf(skill) !== -1) continue;
                                    }
                                    player.removeSkill(skill);
                                    event.target.addSkill(skill);

                                    game.log(player, '将技能', '#g【' + get.translation(skill) + '】', '交给了', event.target);

                                    player.storage.ms_xiebo_return.push({
                                        target: event.target,
                                        skill: skill
                                    });
                                }

                                event.target.addMark('ms_xiebo_mark', selectedSkills.length);
                                player.addSkill('ms_xiebo_return');
                            }
                        }
                    },

                    // 隐藏技能：回收器（无需修改，直接保留之前的代码）
                    ms_xiebo_return: {
                        charlotte: true,
                        trigger: {
                            global: ["phaseEnd", "dieBegin"],
                            player: "dieBegin"
                        },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            if (!player.storage.ms_xiebo_return || !player.storage.ms_xiebo_return.length) return false;
                            if (event.name === 'die' && event.player === player) return true;
                            for (var i = 0; i < player.storage.ms_xiebo_return.length; i++) {
                                if (player.storage.ms_xiebo_return[i].target === event.player) return true;
                            }
                            return false;
                        },
                        content: function () {
                            var isPlayerDying = (trigger.name === 'die' && trigger.player === player);
                            var toReturn = [];

                            for (var i = player.storage.ms_xiebo_return.length - 1; i >= 0; i--) {
                                var item = player.storage.ms_xiebo_return[i];
                                if (isPlayerDying || item.target === trigger.player) {
                                    toReturn.push(item);
                                    player.storage.ms_xiebo_return.splice(i, 1);
                                }
                            }

                            for (var i = 0; i < toReturn.length; i++) {
                                var item = toReturn[i];
                                item.target.removeSkill(item.skill);
                                item.target.removeMark('ms_xiebo_mark', 1);

                                if (!isPlayerDying) {
                                    player.addSkill(item.skill);
                                    game.log(player, '收回了', item.target, '的技能', '#g【' + get.translation(item.skill) + '】');
                                } else {
                                    game.log(item.target, '失去了技能', '#g【' + get.translation(item.skill) + '】');
                                }
                            }

                            if (!player.storage.ms_xiebo_return.length) {
                                player.removeSkill('ms_xiebo_return');
                            }
                        }
                    },
                    //————————————————————————千堂伽耶的技能————————————————————————

                    // 【铸眷】锁定技
                    "ms_zhujuan": {
                        audio: 2,
                        forced: true,
                        trigger: { player: "useCardAfter" },
                        filter: function (event, player) {
                            if (player.storage.ms_zhujuan_ignore) return false;
                            var cond1 = event.targets && event.targets.includes(player);
                            var cond2 = true;
                            if (event.cards && event.cards.length > 0) {
                                var hasHandcard = game.hasPlayer2(function (current) {
                                    return current.hasHistory('lose', function (evt) {
                                        return evt.getParent() === event && evt.hs && evt.hs.length > 0;
                                    });
                                });
                                cond2 = !hasHandcard;
                            }
                            return cond1 || cond2;
                        },
                        content: function () {
                            "step 0"
                            event.cond1 = trigger.targets && trigger.targets.includes(player);
                            event.cond2 = true;
                            if (trigger.cards && trigger.cards.length > 0) {
                                var hasHandcard = game.hasPlayer2(function (current) {
                                    return current.hasHistory('lose', function (evt) {
                                        return evt.getParent() === trigger && evt.hs && evt.hs.length > 0;
                                    });
                                });
                                event.cond2 = !hasHandcard;
                            }

                            if (event.cond1) {
                                var cardname = trigger.card.name;
                                var vcard = { name: cardname, isCard: true };
                                var hasTarget = game.hasPlayer(function (current) {
                                    return current !== player && lib.filter.targetEnabled2(vcard, player, current);
                                });
                                if (hasTarget) {
                                    player.chooseTarget('铸眷：请选择一名其他角色，对其无距离限制地使用【' + get.translation(cardname) + '】',
                                        function (card, pl, target) {
                                            if (target === pl) return false;
                                            var fc = { name: _status.event.cardname, isCard: true };
                                            return lib.filter.targetEnabled2(fc, pl, target);
                                        }, true
                                    ).set('cardname', cardname)
                                        .set('ai', function (target) {
                                            // 【AI 注入】：白嫖的卡牌！大尺度映射，让 AI 疯狂折磨敌人或辅助队友
                                            var pl = _status.event.player;
                                            var fc = { name: _status.event.cardname, isCard: true };
                                            // get.effect 会自动评估这张牌对 target 是好是坏，以及对玩家自己的收益
                                            var eff = get.effect(target, fc, pl, pl);
                                            // 如果收益为正（比如杀敌人，或者无中生有给队友），毫不犹豫地拉满意愿
                                            if (eff > 0) return Math.min(15, 5 + eff * 2);
                                            return 0; // 绝对不乱用导致资敌
                                        });
                                } else {
                                    event.cond1 = false;
                                    event.goto(2);
                                }
                            } else {
                                event.goto(2);
                            }

                            "step 1"
                            if (event.cond1 && result.bool && result.targets && result.targets.length) {
                                var target = result.targets[0];
                                player.logSkill('ms_zhujuan', target);
                                var cardname = trigger.card.name;
                                var cardType = get.type(trigger.card);
                                player.addSkill('ms_zhujuan_range');
                                player.storage.ms_zhujuan_ignore = true;
                                player.useCard({ name: cardname, isCard: true }, target);
                                delete player.storage.ms_zhujuan_ignore;
                                player.removeSkill('ms_zhujuan_range');

                                if (cardType === 'equip' && trigger.cards && trigger.cards.length > 0) {
                                    for (var i = 0; i < trigger.cards.length; i++) {
                                        var equipCard = trigger.cards[i];
                                        if (get.position(equipCard) === 'e' && get.owner(equipCard) === player) {
                                            var subtype = get.subtype(equipCard);
                                            if (!target.getEquip(subtype)) {
                                                player.lose(equipCard, ui.special);
                                                target.equip(equipCard);
                                                game.log(player, '将', equipCard, '转移到了', get.translation(target), '的装备区');
                                            }
                                            break;
                                        }
                                    }
                                }
                            }

                            "step 2"
                            if (event.cond2) {
                                player.logSkill('ms_zhujuan');
                                player.addTempSkill('ms_zhujuan_nolimit', 'phaseUseAfter');
                                game.log(player, '使用的下张牌将', '#y无次数限制');
                            }
                        },
                        ai: {
                            threaten: 1.5,
                        }
                    },

                    "ms_zhujuan_range": {
                        charlotte: true,
                        mod: {
                            targetInRange: function (card, player, target) {
                                return true;
                            },
                        },
                    },

                    "ms_zhujuan_nolimit": {
                        charlotte: true,
                        marktext: "眷",
                        intro: { content: "使用的下张牌无次数限制" },
                        mod: {
                            cardUsable: function (card, player, num) {
                                return Infinity;
                            },
                        },
                        trigger: { player: "useCard1" },
                        forced: true,
                        popup: false,
                        filter: function (event, player) {
                            return !player.storage.ms_zhujuan_ignore;
                        },
                        content: function () {
                            player.removeSkill('ms_zhujuan_nolimit');
                            game.log(player, '消耗了【铸眷】的无次数限制');
                        },
                    },

                    "ms_chantong": {
                        audio: 2,
                        trigger: {
                            source: "damageEnd",
                        },
                        filter: function (event, player) {
                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.chooseCard('he', [0, 2], get.prompt('ms_chantong'), '你可以重铸0至2张牌，然后弃置两张同花色牌（若有），再摸一张牌').set('ai', function (card) {
                                // 【AI 注入】：重铸属于白嫖洗牌。把手里的废牌（价值<5）毫不犹豫地重铸掉，换取新牌！
                                var val = get.value(card);
                                if (val <= 5) return Math.min(15, 10 - val);
                                return 0; // 好牌留着绝对不重铸
                            });

                            "step 1"
                            if (result.bool) {
                                player.logSkill('ms_chantong');
                                if (result.cards && result.cards.length > 0) {
                                    player.discard(result.cards);
                                    player.draw(result.cards.length);
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            var cards = player.getCards('he');
                            var suits = {};
                            var has_same_suit = false;
                            for (var i = 0; i < cards.length; i++) {
                                var s = get.suit(cards[i], player);
                                if (s && s !== 'none') {
                                    suits[s] = (suits[s] || 0) + 1;
                                    if (suits[s] >= 2) {
                                        has_same_suit = true;
                                        break;
                                    }
                                }
                            }

                            if (has_same_suit) {
                                // 第三个参数 true 代表这是强制弃牌，不可取消！
                                player.chooseCard('he', 2, true, '缠通：请弃置两张同花色牌').set('filterCard', function (card, player) {
                                    var s = get.suit(card, player);
                                    if (!s || s === 'none') return false;

                                    if (ui.selected.cards.length > 0) {
                                        return s === get.suit(ui.selected.cards[0], player);
                                    }

                                    var cards = player.getCards('he');
                                    var count = 0;
                                    for (var i = 0; i < cards.length; i++) {
                                        if (get.suit(cards[i], player) === s) count++;
                                    }
                                    return count >= 2;
                                }).set('ai', function (card) {
                                    // 【AI 注入】：既然是被迫弃牌，那就含泪把价值最底线的破烂扔掉（价值越低分数越高）
                                    return 15 - get.value(card);
                                });
                            } else {
                                event.goto(4);
                            }

                            "step 3"
                            if (result.bool && result.cards && result.cards.length === 2) {
                                player.discard(result.cards);
                            }

                            "step 4"
                            player.draw();
                        }
                    },

                    // 【断翼】主技能
                    "ms_duanyi": {
                        audio: 2,
                        enable: "chooseToUse",
                        ai: {
                            order: 8.5,
                            result: {
                                player: 15
                            }
                        },
                        filter(event, player) {
                            return player.getCards("h").some((card) =>
                                get.suit(card) != "none" && player.countCards("h", { suit: get.suit(card) }) === 1
                            );
                        },
                        chooseButton: {
                            dialog(event, player) {
                                const list = get.inpileVCardList((info) => get.type(info[2]) == "basic");
                                return ui.create.dialog("断翼：选择你要将其当做哪种基本牌使用", [list, "vcard"]);
                            },
                            filter(button, player) {
                                return _status.event.getParent().filterCard(
                                    { name: button.link[2], nature: button.link[3] },
                                    player,
                                    _status.event.getParent()
                                );
                            },
                            check(button) {
                                const player = get.event("player");
                                var name = button.link[2];
                                var val = player.getUseValue({ name: name, nature: button.link[3] });

                                // 【AI 注入：强行破防连招检测】
                                // 如果印的是【杀】，AI 会意识到后续可以强迫目标手里的【闪】变成【杀】从而无法闪避！
                                // 所以印【杀】的实际期望收益极高！赋予额外的破防加分。
                                if (name === 'sha') val += 5;

                                if (val > 0) return Math.min(15, 5 + val * 2);
                                return 0;
                            },
                            backup(links, player) {
                                return {
                                    audio: "ms_duanyi",
                                    filterCard(card, player) {
                                        return get.suit(card) != "none" && player.countCards("h", { suit: get.suit(card) }) === 1;
                                    },
                                    position: "h",
                                    viewAs: { name: links[0][2], nature: links[0][3] },
                                    popname: true,
                                    check(card) {
                                        return 15 - get.value(card);
                                    }
                                };
                            },
                            prompt(links, player) {
                                return "将每个花色最后一张手牌当作" + (get.translation(links[0][3]) || "") + "【" + get.translation(links[0][2]) + "】使用";
                            }
                        },
                        group: ["ms_duanyi_trigger"]
                    },

                    // 触发部分：每以此法使用一种牌名后，令一名无断翼的角色获得负面状态
                    "ms_duanyi_trigger": {
                        audio: 2,
                        trigger: { player: "useCard" },
                        filter(event, player) {
                            return event.skill === "ms_duanyi_backup";
                        },
                        direct: true,
                        content() {
                            "step 0"
                            const vname = trigger.card.name;
                            player.chooseTarget(
                                get.prompt("ms_duanyi"),
                                "令一名无主技能【断翼】的角色获得残缺版效果（若已有则覆盖并刷新持续时间）：其每个花色最后一张手牌强制视为【" + get.translation(vname) + "】，直到其下个回合结束。",
                                function (card, player, target) {
                                    return !target.hasSkill("ms_duanyi");
                                }
                            ).set("ai", function (target) {
                                var player = _status.event.player;
                                var triggerEvent = _status.event.getTrigger();
                                var att = get.attitude(player, target);
                                var vname = triggerEvent.card.name; // 刚才印出的牌名

                                // 绝杀逻辑只针对敌人
                                if (att < 0) {
                                    var score = 5 + Math.abs(att);

                                    // 【AI 注入：强命中锁定】
                                    // 如果刚才印的是杀，谁最该中这个Debuff？当然是那个正要被你杀、急需出闪的敌人！
                                    // 把他手里的牌全变成杀，直接掐断他的防御！
                                    var isTarget = triggerEvent.targets && triggerEvent.targets.includes(target);
                                    if (vname === 'sha' && isTarget) {
                                        score += 8; // 极高优先级追击当前被杀的目标
                                    }

                                    // 补充逻辑：如果敌人手牌极少（<=2张），他的牌必定是某花色的“最后一张”。
                                    // 此时给他挂 Debuff 相当于 100% 成功篡改，威胁极大！
                                    if (target.countCards('h') <= 2) {
                                        score += 4;
                                    }

                                    return Math.min(15, score);
                                }
                                return 0;
                            });

                            "step 1"
                            if (result.bool && result.targets.length) {
                                const target = result.targets[0];
                                player.logSkill("ms_duanyi", target);
                                const vname = trigger.card.name;

                                if (target.hasSkill("ms_duanyi_debuff")) {
                                    target.removeSkill("ms_duanyi_debuff");
                                    target.removeSkill("ms_duanyi_skip_clear");
                                }

                                target.addSkill("ms_duanyi_debuff");
                                target.markAuto("ms_duanyi_debuff", [vname]);

                                if (_status.currentPhase === target) {
                                    target.addTempSkill("ms_duanyi_skip_clear", { player: "phaseAfter" });
                                }
                            }
                        }
                    },

                    // ...后续 Debuff 状态部分保持不变即可...

                    // Debuff 状态部分：动态强制视为
                    "ms_duanyi_debuff": {
                        charlotte: true,
                        onremove(player, skill) {
                            delete player.storage.ms_duanyi_debuff;
                        },
                        marktext: "断翼",
                        intro: {
                            content(storage, player) {
                                if (!storage || !storage.length) return "无效果";
                                const lastName = storage[storage.length - 1];
                                return "每个花色最后一张手牌强制视为【" + get.translation(lastName) + "】";
                            }
                        },
                        mod: {
                            cardname(card, player) {
                                if (get.position(card) === "h" && get.suit(card) !== "none" && player.countCards("h", { suit: get.suit(card) }) === 1) {
                                    const storage = player.storage.ms_duanyi_debuff;
                                    if (storage && storage.length > 0) {
                                        return storage[storage.length - 1];
                                    }
                                }
                            }
                        },
                        group: ["ms_duanyi_clear"]
                    },

                    // 回合结束清理技能
                    "ms_duanyi_clear": {
                        trigger: { player: "phaseEnd" },
                        forced: true,
                        charlotte: true,
                        popup: false,
                        filter(event, player) {
                            return !player.hasSkill("ms_duanyi_skip_clear");
                        },
                        content() {
                            player.removeSkill("ms_duanyi_debuff");
                        }
                    },

                    // 用来辅助计时的占位空技能
                    "ms_duanyi_skip_clear": { charlotte: true },

                    //————————————————————————丛雨的技能————————————————————————

                    "zengdao": {
                        audio: 2,
                        trigger: { player: "phaseUseBegin" },
                        forced: true,
                        content: function () {
                            "step 0"
                            event.targets = game.filterPlayer().sortBySeat(player);
                            event.num = 0;

                            "step 1"
                            if (event.num < event.targets.length) {
                                var target = event.targets[event.num];
                                if (target.isIn()) {
                                    var card = get.cardPile2(function (c) {
                                        return get.subtype(c) === 'equip1' && target.canUse(c, target);
                                    });
                                    if (card) {
                                        target.chooseUseTarget(card, 'nopopup', 'noanimate', true);
                                    }
                                }
                                event.num++;
                                event.redo();
                            } else {
                                player.addTempSkill("zengdao_jiedao", "phaseAfter");
                            }
                        },
                        subSkill: {
                            jiedao: {
                                audio: 2,
                                enable: "chooseToUse",
                                usable: 1,
                                filterCard: function (card) {
                                    return get.type(card) === 'trick';
                                },
                                position: "hes",
                                viewAs: { name: "jiedao" },
                                prompt: "你可以将一张锦囊牌当【借刀杀人】使用",
                                check: function (card) {
                                    // 【AI 注入】：极其廉价的借刀杀人！因为这回合大家都被你塞了武器！
                                    // 把没用的锦囊（如闪电、多余的无懈）扔出去借刀，权重拉满！
                                    return 15 - get.value(card);
                                },
                                ai: {
                                    order: 8.5, // 优先级极高，先把场上的刀借来杀人
                                    result: {
                                        player: 15
                                    }
                                }
                            }
                        }
                    },

                    "ms_baiwei": {
                        audio: 2,
                        locked: true,
                        group: ["ms_baiwei_lose", "ms_baiwei_damage"],
                        intro: {
                            content: "锁定技，你的回合内：1.一名角色失去装备牌后，你对其造成1点伤害，然后其摸两张牌；2.一名角色受到1点伤害后，你摸一张牌。"
                        }
                    },

                    "ms_baiwei_lose": {
                        audio: "ms_baiwei",
                        trigger: { global: "loseAfter" },
                        forced: true,
                        locked: false,
                        logTarget: "player",
                        filter(event, player) {
                            if (_status.currentPhase !== player) return false;
                            if (event.es && event.es.length > 0) return true;
                            if (event.cards && event.cards.length > 0) {
                                return event.cards.some(card => card.original === 'e');
                            }
                            return false;
                        },
                        content() {
                            "step 0"
                            trigger.player.damage(1, player);
                            "step 1"
                            trigger.player.draw(2);
                        }
                    },

                    "ms_baiwei_damage": {
                        audio: "ms_baiwei",
                        trigger: { global: "damageAfter" },
                        forced: true,
                        locked: false,
                        filter(event, player) {
                            return _status.currentPhase === player;
                        },
                        content() {
                            player.draw(trigger.num);
                        }
                    },

                    "ms_jianwu": {
                        audio: 2,
                        enable: "phaseUse",
                        limited: true,
                        skillAnimation: true,
                        animationColor: "orange",
                        mark: true,
                        marktext: "舞",
                        // 【AI 注入】：限定技的大局观释放中枢！
                        ai: {
                            order: 10,
                            result: {
                                player: function (player) {
                                    // 限定技不要乱交，看准时机！
                                    // 场上敌人越多，且敌人们手牌和装备越丰富时（意味着能榨取更多资源），开大招！
                                    var enemies = game.filterPlayer(function (current) {
                                        return get.attitude(player, current) < 0;
                                    });
                                    if (enemies.length >= 2) return 15; // 敌人>=2个，直接开舞！
                                    return 0;
                                }
                            }
                        },
                        intro: {
                            content: "限定技，出牌阶段，你可以令所有角色依次选择一项：①.其视为使用一张【借刀杀人】；②.交给你一个有牌区域（手牌区、装备区或判定区）的所有牌。"
                        },
                        filter(event, player) {
                            return !player.hasSkill("ms_jianwu_used");
                        },
                        content() {
                            "step 0"
                            player.awakenSkill("ms_jianwu");
                            player.addSkill("ms_jianwu_used");
                            event.targets = game.filterPlayer().sortBySeat(player);
                            event.num = 0;

                            "step 1"
                            if (event.num < event.targets.length) {
                                var target = event.targets[event.num];
                                if (target.isIn()) {
                                    var controls = [];

                                    var canJiedao = game.hasPlayer(function (current) {
                                        return target.canUse({ name: 'jiedao' }, current);
                                    });

                                    if (canJiedao) controls.push("使用借刀");
                                    if (target.countCards('h') > 0) controls.push("交出手牌");
                                    if (target.countCards('e') > 0) controls.push("交出装备");
                                    if (target.countCards('j') > 0) controls.push("交出判定");

                                    if (controls.length === 0) {
                                        event.num++;
                                        event.redo();
                                        return;
                                    }
                                    else if (controls.length === 1 && controls[0] === "使用借刀") {
                                        event.choice = "使用借刀";
                                    }
                                    else {
                                        var next = target.chooseControl(controls);
                                        next.set('prompt', '剑舞：请选择一项');

                                        next.set('ai', function () {
                                            // 【AI 注入】：受害者视角的智能止损逻辑
                                            var target = _status.event.player;
                                            var player = _status.event.getParent().player;
                                            var att = get.attitude(target, player);
                                            var controls = _status.event.controls;

                                            if (att < 0) { // 如果丛雨是敌人（我是受害者）
                                                // 最优解：判定区有烂牌，直接甩给丛雨！
                                                if (controls.includes('交出判定') && target.countCards('j', c => get.judge(c) < 0) > 0) return '交出判定';
                                                // 次优解：借刀杀人去打别的敌人（如果是打队友就不干了，但底层 useCard 会管这事），可以先选借刀
                                                if (controls.includes('使用借刀') && target.hasValueTarget({ name: 'jiedao' })) return '使用借刀';
                                                // 迫不得已：交装备（如果只有1个破装备），否则交手牌（如果手牌快空了）
                                                if (controls.includes('交出装备') && target.countCards('e') <= 1) return '交出装备';
                                                if (controls.includes('交出手牌') && target.countCards('h') <= 1) return '交出手牌';
                                                // 兜底
                                                if (controls.includes('交出判定')) return '交出判定';
                                                if (controls.includes('使用借刀')) return '使用借刀';
                                                return controls[controls.length - 1];
                                            } else { // 如果丛雨是队友（我是辅助）
                                                // 尽量把有用的东西（手牌、装备）全交给丛雨，让她爆发！
                                                if (controls.includes('使用借刀') && target.hasValueTarget({ name: 'jiedao' })) return '使用借刀';
                                                if (controls.includes('交出手牌') && target.countCards('h') > 0) return '交出手牌';
                                                if (controls.includes('交出装备') && target.countCards('e') > 0) return '交出装备';
                                                return controls[0];
                                            }
                                        });
                                    }
                                } else {
                                    event.num++;
                                    event.redo();
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            var target = event.targets[event.num];
                            var choice = event.choice || result.control;

                            if (choice === "使用借刀") {
                                target.chooseUseTarget({ name: 'jiedao' }, '剑舞：强制视为使用【借刀杀人】，不可取消', true);
                            } else if (choice) {
                                var zone = '';
                                if (choice === "交出手牌") zone = 'h';
                                else if (choice === "交出装备") zone = 'e';
                                else if (choice === "交出判定") zone = 'j';

                                var cards = target.getCards(zone);
                                if (cards.length > 0) {
                                    if (target !== player) {
                                        player.gain(cards, target, 'give', 'bySelf');
                                    } else {
                                        if (zone !== 'h') player.gain(cards, 'gain2');
                                    }
                                }
                            }

                            "step 3"
                            event.num++;
                            event.goto(1);
                        },
                        subSkill: {
                            used: { charlotte: true }
                        }
                    },

                    //————————————————————————千堂英里华的技能————————————————————————

                    "zhujuan": {
                        audio: 2,
                        trigger: { global: "useCardEnd" },
                        forced: true,
                        filter: function (event, player) {
                            if (_status.currentPhase !== player) return false;
                            if (get.type(event.card) !== 'basic' && get.type(event.card) !== 'trick') return false;
                            if (!event.targets || !event.targets.includes(player)) return false;
                            if (!event.card.name) return false;
                            return true;
                        },
                        content: function () {
                            "step 0"
                            player.draw(1);

                            "step 1"
                            if (player.countCards('he') > 0) {
                                var cardName = trigger.card.name;
                                var cardNature = trigger.card.nature;

                                var viewAsCard = { name: cardName };
                                if (cardNature) viewAsCard.nature = cardNature;

                                var canTargetOther = function (target) {
                                    if (target === player) return false;
                                    if (!target.isAlive()) return false;
                                    if (['wuzhong', 'tao', 'jiu'].includes(cardName)) {
                                        return true;
                                    }
                                    return player.canUse(viewAsCard, target);
                                };

                                if (game.hasPlayer(canTargetOther)) {
                                    player.chooseCardTarget({
                                        prompt: '铸眷：请选择一张牌当作【' + get.translation(cardName) + '】对一名其他角色使用（伤害+1）',
                                        filterCard: function (card, player) {
                                            return true;
                                        },
                                        selectCard: 1,
                                        selectTarget: 1,
                                        position: 'he',
                                        filterTarget: function (card, player, target) {
                                            if (target === player) return false;
                                            var viewAsName = _status.event.viewAsName;
                                            if (['wuzhong', 'tao', 'jiu'].includes(viewAsName)) {
                                                return target.isAlive();
                                            }
                                            return player.canUse(_status.event.viewAsCard, target);
                                        },
                                        ai1: function (card) {
                                            // 【AI 注入】：选一张最没用的牌去印卡，权重拉满
                                            return 15 - get.value(card);
                                        },
                                        ai2: function (target) {
                                            // 【AI 注入】：精准评估连击的收益！比如印杀去砍敌人，印无中生有送给队友！
                                            var eff = get.effect(target, _status.event.viewAsCard, _status.event.player, _status.event.player);
                                            if (eff > 0) return Math.min(15, 5 + eff * 2);
                                            return 0; // 绝对不资敌
                                        }
                                    }).set('viewAsCard', viewAsCard)
                                        .set('viewAsName', cardName)
                                        .set('forced', true)
                                        .set('mandory', true);
                                } else {
                                    game.log(player, '当前场上没有可以成为【' + get.translation(cardName) + '】合法目标的其他角色，停止印牌！');
                                    event.finish();
                                }
                            } else {
                                game.log(player, '没有可以用来当牌使用的实体牌！');
                                event.finish();
                            }

                            "step 2"
                            if (result.bool && result.cards && result.targets) {
                                var cardName = trigger.card.name;
                                var cardNature = trigger.card.nature;
                                var viewAsCard = { name: cardName };
                                if (cardNature) viewAsCard.nature = cardNature;

                                player.addTempSkill('zhujuan_damage_buff', 'useCardAfter');
                                player.storage.zhujuan_dmg_card = cardName;

                                game.log(player, '发动了', '#g【铸眷】', '，将', result.cards, '当作', '#y【' + get.translation(cardName) + '】', '对', result.targets, '使用！');

                                player.useCard(viewAsCard, result.cards, result.targets);
                            }
                        }
                    },

                    "zhujuan_damage_buff": {
                        charlotte: true,
                        trigger: { source: "damageBegin1" },
                        forced: true,
                        popup: false,
                        silent: true,
                        filter: function (event, player) {
                            if (!player.storage.zhujuan_dmg_card || !event.card) return false;
                            return event.card.name === player.storage.zhujuan_dmg_card;
                        },
                        content: function () {
                            trigger.num++;
                            game.log(player, '的', '#g【铸眷】', '增伤效果触发，此次伤害', '#y+1', '！');
                            player.removeSkill('zhujuan_damage_buff');
                            delete player.storage.zhujuan_dmg_card;
                        },
                        onremove: function (player, skill) {
                            delete player.storage.zhujuan_dmg_card;
                        }
                    },

                    "ms_polong": {
                        audio: 2,
                        trigger: { player: "useCardAfter" },
                        filter: function (event, player) {
                            var type = get.type(event.card.name) || get.type(event.card);
                            if (type !== 'trick') return false;
                            return game.hasPlayer(function (current) {
                                return current !== player;
                            });
                        },
                        prompt: function (event, player) {
                            return '你可以令一名角色与【' + get.translation(event.card) + '】拼点';
                        },
                        content: function () {
                            "step 0"
                            var cardname = trigger.card.name;
                            player.chooseTarget('破笼：请选择一名角色与【' + get.translation(cardname) + '】拼点', function (card, pl, target) {
                                return target !== pl;
                            }).set('ai', function (target) {
                                // 【AI 注入】：精神施压！敌人输了会倒大霉，所以疯狂找手牌少的或者核心敌人拼点。
                                var att = get.attitude(_status.event.player, target);
                                if (att < 0) return Math.min(15, 5 + Math.abs(att));
                                return 0;
                            });

                            "step 1"
                            if (result.bool && result.targets && result.targets.length > 0) {
                                event.target = result.targets[0];
                                player.logSkill('ms_polong', event.target);

                                var cardPoint = get.number(trigger.card) || 0;

                                if (event.target.countCards('h') > 0) {
                                    event.target.chooseCard(1, true).set('prompt', '破笼：必须选择一张手牌与【' + get.translation(trigger.card) + '】（点数：' + cardPoint + '）拼点').set('ai', function (card) {
                                        var targetPoint = get.number(card) || 0;
                                        var basePoint = get.number(_status.event.basePoint) || 0;
                                        // 【受害者 AI】：如果能出大牌赢下拼点，坚决出大牌保命！
                                        if (targetPoint > basePoint) return 100 - get.value(card); // 确保赢的前提下出最便宜的
                                        // 如果注定要输，那就直接摆烂，把最烂的废牌交出去！
                                        return 15 - get.value(card);
                                    }).set('basePoint', cardPoint);
                                } else {
                                    event.goto(3);
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            var numCard = get.number(trigger.card) || 0;
                            if (result.bool && result.cards && result.cards.length > 0) {
                                event.respondCard = result.cards[0];

                                event.target.$throw(event.respondCard);
                                event.target.lose(event.respondCard, ui.processing);

                                var numTarget = get.number(event.respondCard) || 0;
                                game.log(event.target, '用来拼点的牌是', event.respondCard, '，点数为', '#Y' + numTarget);
                                game.log('作为拼点目标的', trigger.card, '点数为', '#Y' + numCard);

                                if (numTarget > numCard) {
                                    game.log(event.target, '拼点', '#g成功');
                                    game.cardsDiscard(event.respondCard);
                                    event.finish();
                                } else {
                                    game.log(event.target, '拼点', '#r失败');
                                }
                            } else {
                                event.goto(3);
                            }
                            "step 3"
                            if (!event.respondCard) {
                                game.log(event.target, '没有手牌，只能视为对', player, '使用一张【杀】');
                                event.control = 'opt1';
                                event.goto(5);
                            } else {
                                var canGuohe = player.countCards('he') > 0;
                                var choiceList = ['opt1'];
                                var promptList = ['将此牌交给' + get.translation(player) + '，并视为对其使用一张【杀】'];

                                if (canGuohe) {
                                    choiceList.push('opt2');
                                    promptList.push('将此牌当【过河拆桥】对' + get.translation(player) + '使用');
                                }

                                event.target.chooseControl(choiceList).set('prompt', '破笼：拼点失败！请选择一项：').set('choiceList', promptList).set('ai', function () {
                                    // 【受害者 AI】：既然拼点输了，就得二选一反制瑛里华。
                                    // 默认选过河拆桥（opt2），因为能破坏她的防御结构。如果没得拆，只能含泪送牌并强制出杀。
                                    return canGuohe ? 'opt2' : 'opt1';
                                });
                            }

                            "step 4"
                            if (result.control) {
                                event.control = result.control;
                            }

                            "step 5"
                            event.target.addTempSkill('ms_polong_force', 'useCardAfter');

                            if (event.control === 'opt1') {
                                if (event.respondCard) {
                                    player.gain([event.respondCard], event.target, 'give');
                                    game.log(event.target, '将', event.respondCard, '交给了', player);
                                }
                                game.log(event.target, '视为对', player, '使用了一张【杀】');
                                event.target.useCard({ name: 'sha', isCard: true }, player, false);
                            } else {
                                game.log(event.target, '将', event.respondCard, '当做【过河拆桥】对', player, '使用！');
                                if (event.respondCard) event.target.$gain2(event.respondCard, false);
                                event.target.useCard({ name: 'guohe', isCard: true, cards: [event.respondCard] }, player);
                            }
                        }
                    },

                    "ms_polong_force": {
                        charlotte: true,
                        mod: {
                            targetInRange: function (card, player, target) {
                                if (card.name === 'sha' || card.name === 'guohe') return true;
                            },
                            targetEnabled: function (card, player, target) {
                                if (card.name === 'sha' || card.name === 'guohe') return true;
                            },
                            cardUsable: function (card, player, num) {
                                if (card.name === 'sha' || card.name === 'guohe') return Infinity;
                            },
                            cardEnabled: function (card, player) {
                                if (card.name === 'sha' || card.name === 'guohe') return true;
                            }
                        }
                    },


                    //————————————————————————真红的技能————————————————————————

                    ms_duota: {
                        audio: 2,
                        enable: 'phaseUse',
                        filter: function (event, player) {
                            return !player.hasSkill('ms_duota_ban');
                        },
                        filterTarget: function (card, player, target) {
                            return target.countDiscardableCards(player, 'he') > 0;
                        },
                        content: function () {
                            "step 0"
                            if (target === player) {
                                // 注意这里去掉了固定数量参数，完全交给下方的 selectCard 动态判断
                                player.chooseToDiscard('he', '请弃置一张牌；或弃置任意张方片牌')
                                    .set('complexCard', true) // 【修复点1】正确的卡牌面板动态刷新开关
                                    .set('selectCard', function () {
                                        // 【修复点2】动态锁定可选数量上限
                                        if (ui.selected.cards.length > 0 && get.suit(ui.selected.cards[0], _status.event.player) !== 'diamond') {
                                            return [1, 1]; // 如果选的第一张不是方片，上限死锁为1张
                                        }
                                        return [1, Infinity]; // 如果是方片，则不限制上限
                                    })
                                    .set('filterCard', function (card, player) {
                                        if (ui.selected.cards.length > 0) {
                                            // 【修复点3】第一张是方片，则其他牌必须也是方片才能被点选
                                            if (get.suit(ui.selected.cards[0], player) === 'diamond') {
                                                return get.suit(card, player) === 'diamond';
                                            }
                                            // 如果第一张不是方片，直接让其他所有牌变灰不可选
                                            return false;
                                        }
                                        return true; // 还没选牌时，所有牌都能点
                                    })
                                    .set('ai', function (card) {
                                        // 【AI 弃牌战术打法】
                                        var player = _status.event.player;
                                        var suit = get.suit(card, player);
                                        var val = get.value(card);

                                        // 1. 方片：制衡换牌！优先弃置低价值方片牌
                                        if (suit === 'diamond') {
                                            return val < 7 ? (8 - val) : -1;
                                        }

                                        // 2. 黑桃：如果有雷杀的目标，抛弃黑桃转化为雷杀砸敌人
                                        if (suit === 'spade' && player.hasValueTarget({ name: 'sha', nature: 'thunder' })) {
                                            return 10 - val;
                                        }

                                        // 3. 梅花：如果有铁索的目标，抛弃梅花转化为铁索连环
                                        if (suit === 'club' && player.hasValueTarget({ name: 'tiesuo' })) {
                                            return 9 - val;
                                        }

                                        // 4. 红桃：会导致本回合技能失效，极力避免！
                                        if (suit === 'heart') return -100;

                                        return -10;
                                    });
                            } else {
                                // 弃置其他人的牌时，盲抽
                                player.discardPlayerCard(target, 'he', true);
                            }
                            "step 1"
                            var cards;
                            if (target === player) {
                                cards = result.cards;
                            } else {
                                cards = result.cards || result.links;
                            }

                            if (cards && cards.length) {
                                // 经过前面的严密限制，如果选了多张，必然全是方片，取第一张判定即可
                                var suit = get.suit(cards[0], target);
                                event.suit = suit;
                                event.cards_count = cards.length;
                                game.log(player, '弃置的牌花色为', get.translation(suit));
                            } else {
                                event.finish();
                            }
                            "step 2"
                            switch (event.suit) {
                                case 'diamond':
                                    // 方片：其摸等同于弃牌数量的牌
                                    target.draw(event.cards_count);
                                    break;
                                case 'heart':
                                    // 红桃：此技能本回合失效
                                    player.addTempSkill('ms_duota_ban', { player: 'phaseAfter' });
                                    game.log(player, '的技能', '#g【堕塔】', '本回合失效');
                                    break;
                                case 'club':
                                    // 梅花：其视为使用一张铁索连环
                                    target.chooseUseTarget('tiesuo', true, false, 'nopopup').set('norecord', true);
                                    break;
                                case 'spade':
                                    // 黑桃：其视为使用一张雷【杀】
                                    target.chooseUseTarget({ name: 'sha', nature: 'thunder' }, true, false, 'nopopup').set('norecord', true);
                                    break;
                            }
                        },
                        ai: {
                            order: 7,
                            result: {
                                target: function (player, target) {
                                    // 【精细化收益评估，彻底解决死循环】

                                    // 情况 A：对自己发动
                                    if (player === target) {
                                        // 策略 1：制衡低价值方片牌
                                        var diamondCards = player.getCards('he', function (card) {
                                            return get.suit(card, player) === 'diamond' && get.value(card) < 7;
                                        });
                                        if (diamondCards.length > 0) {
                                            return diamondCards.length * 15; // 方片牌越多，制衡收益越高
                                        }

                                        // 策略 2：用黑桃牌转化为【雷杀】攻击敌人
                                        var hasSpade = player.hasCard(function (card) {
                                            return get.suit(card, player) === 'spade' && get.value(card) < 8;
                                        }, 'he');
                                        if (hasSpade && player.hasValueTarget({ name: 'sha', nature: 'thunder' })) {
                                            return 25;
                                        }

                                        // 策略 3：用梅花牌转化为【铁索连环】连接敌人
                                        var hasClub = player.hasCard(function (card) {
                                            return get.suit(card, player) === 'club' && get.value(card) < 8;
                                        }, 'he');
                                        if (hasClub && player.hasValueTarget({ name: 'tiesuo' })) {
                                            return 20;
                                        }

                                        // 如果不满足上述任何套路，对自己发动返回 0，AI 将绝对不会按技能按钮！
                                        return 0;
                                    }

                                    // 情况 B：对其他角色发动（拆敌人的牌）
                                    var att = get.attitude(player, target);
                                    if (att < 0) {
                                        // 极大尺度打击敌人：如果敌人有牌可拆，收益拉满
                                        if (target.countDiscardableCards(player, 'he') > 0) {
                                            return -att * 10;
                                        }
                                    }

                                    // 不盲目拆队友的牌
                                    return 0;
                                }
                            }
                        }
                    },
                    // 配套的隐藏状态技能，用于记录“堕塔”本回合是否失效
                    ms_duota_ban: {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: '本回合不能发动【堕塔】'
                        }
                    },


                    ms_shizu: {
                        audio: 2,
                        trigger: { player: 'dying' },
                        forced: true,
                        filter: function (event, player) {
                            // 检查当前轮数（game.roundNumber）是否与记录的轮数不同，确保每轮限一次
                            return player.storage.ms_shizu_round !== game.roundNumber;
                        },
                        content: function () {
                            // 记录当前轮数
                            player.storage.ms_shizu_round = game.roundNumber;

                            var num = 1;
                            // 判断当前回合是否是该角色的回合内
                            if (_status.currentPhase === player) {
                                // 濒死时血量 <= 0，要回满血即补足与体力上限的差值
                                num = player.maxHp - player.hp;
                                game.log(player, '回复至满体力');
                            }

                            if (num > 0) {
                                player.recover(num);
                            }
                        }
                    },

                },
                translate: {



                    "ms_gemeng": "割梦",
                    "ms_gemeng_info": "出牌阶段限一次或你受到伤害后，你可以令一名角色选择弃置任意张牌，然后你选择一项: 1.重铸与弃置牌数量与花色搭配均相同的牌，并对其造成一点伤害；2.此技能本回合失效。",

                    "ms_rongxue": "融雪",
                    "ms_rongxue_info": "出牌阶段限一次，或你成为其它角色使用牌的目标后，若你有牌，你可以摸一张牌并选择一项：1.使用一张未使用过牌名的牌；2.弃置两张牌，若弃置牌类型相同，你令此类型一个牌名视为未使用过。",

                    "ms_liuhua": "流华",
                    "ms_liuhua_info": "你的出牌阶段结束时，所有角色可同时选择扣置任意张牌；本轮结束时，你依次使用所有伤害类扣置牌，且这些牌造成的伤害+1；结算期间，其它角色的原有手牌与装备被封印，但可以使用或打出其个人的扣置牌；结算结束后，你摸等于全场剩余扣置牌数量的牌，并弃置全部扣置牌。",

                    "ms_xingren": "幸忍",
                    "ms_xingren_info": "你使用手牌指定目标后，可以取消所有目标并摸取消目标数张牌，然后追加自己为目标。若如此做你选择一项：<br>1.你使用的下一张牌无次数限制；<br>2.你使用的下一张牌可以追加两个无距离限制的目标。<br><b>背水：</b>失去一点体力。",
                    "ms_xingren_buff1": "幸忍(无次)",
                    "ms_xingren_buff2": "幸忍(双增)",

                    "ms_chixie": "持械",
                    "ms_chixie_info": "每种牌名限一次，你可以令任意角色发动防具效果，或令自己发动武器效果，结算后，你选择一项：<br>1.获得因此被弃置、无效、判定亮出的牌；<br>2.令发动装备牌效果的角色将至少一张牌当【杀】使用。",
                    "ms_zhongliu": "中流",
                    "ms_zhongliu_info": "当你使用牌时，若此牌不是你的手牌，你武将牌上的技能视为未发动过。",

                    // ↓↓↓ 下面这些是持械子技能的必要翻译，缺少它们就会在游戏中弹出英文 ↓↓↓
                    "ms_chixie_bagua": "八卦阵",
                    "ms_chixie_renwang": "仁王盾",
                    "ms_chixie_tengjia1": "藤甲",
                    "ms_chixie_tengjia2": "藤甲",
                    "ms_chixie_baiyin": "白银狮子",
                    "ms_chixie_zhuge": "诸葛连弩",
                    "ms_chixie_cixiong": "雌雄双股剑",
                    "ms_chixie_qinggang": "青釭剑",
                    "ms_chixie_hanbing": "寒冰箭",
                    "ms_chixie_qinglong": "青龙偃月刀",
                    "ms_chixie_guanshi": "贯石斧",
                    "ms_chixie_guding": "古锭刀",
                    "ms_chixie_fangtian": "方天画戟",
                    "ms_chixie_qilin": "麒麟弓",
                    "ms_chixie_zhuque": "朱雀羽扇",
                    "ms_chixie_zhangba": "丈八蛇矛",

                    // ↓↓↓ 专门给右下角【丈八蛇矛】主动点击按钮准备的翻译 ↓↓↓
                    "ms_chixie_zhangba_viewas": "丈八蛇矛",
                    "ms_chixie_zhangba_viewas_info": "你可以将两张牌当【杀】使用或打出。",

                    "ms_fanhun": "返魂",
                    "ms_fanhun_info": "每轮开始时或出牌阶段，若场上没有【人偶】，你可以失去任意个勾玉在任意位置召唤一个等勾玉数的【人偶】并指定任意名角色作为队友。<br>你可以使用人偶的手牌。",
                    "ms_fanhun_trigger": "返魂",
                    "ms_fanhun_trigger_info": "每轮开始时，若场上没有【人偶】，你可以失去任意个勾玉在任意位置召唤一个等勾玉数的【人偶】并指定任意名角色作为队友。<br>你可以使用人偶的手牌。",
                    "ms_fanhun_puppet_logic": "返魂",
                    "ms_fanhun_use": "返魂",
                    "ms_fanhun_change": "返魂",
                    "ms_fanhun_change_info": "时刻将你的手牌同步给主人。",
                    "ms_qianwang": "虔望",
                    "ms_qianwang_info": "当你召唤的【人偶】死亡时，你增加等量体力上限。",



                    "ms_shuijing": "水镜",
                    "ms_shuijing_info": "出牌阶段，若你有空体力上限，你可以减少一点空勾玉，并获得一个【镜】装备栏。",
                    "ms_chichu": "迟躇",
                    "ms_chichu_info": "当你受到伤害时，你可以将一个装备栏交给伤害来源，以防止此次伤害。<br>出牌阶段，你可以交给其它角色一个装备栏。",
                    "ms_jing_system": "入镜",
                    "ms_chichu_active": "迟躇",
                    "ms_qitian": "欺天",
                    "ms_qitian_info": "<b>转换技</b>，出牌阶段：<br>【阳】你可以将场上一张装备牌当本回合未使用过的普通锦囊牌使用。<br>【阴】你可以废除一名角色的一个【镜】栏，并弃置其两张牌。",

                    "ms_lianmeng": "敛梦",
                    "ms_lianmeng_info": "出牌阶段结束时，你可以将所有手牌交给一名其它角色。若如此做，此角色下个出牌阶段结束时将所有牌（包括装备）交给下家，下家重复之直到牌再次传到你的手上。",
                    "ms_lianmeng_effect": "敛梦（传花中）",

                    "ms_shenlou": "蜃楼",
                    "ms_shenlou_info": "当你的空勾玉数变化时，你摸一张牌。",
                    "ms_dianxing": "点醒",
                    "ms_dianxing_info": "回合开始时，或当你受到伤害后，你可以选择一项：1. 加1点体力上限；2. 根据下列顺序获得一个技能：①水镜 ②流华 ③返魂 ④协波 ⑤溃世。",
                    "ms_kuishi": "溃世",
                    "ms_kuishi_info": "<b>限定技</b>，出牌阶段，你可以减少三点体力上限，将当前牌堆移出游戏。下次洗牌时，你将移出的牌放回牌堆末尾并重新洗牌，然后你与任意名你选择的角色各受到三点雷电伤害。",
                    "ms_xiebo": "协波",
                    "ms_xiebo_info": "回合结束时，你可以将你的一项技能交给一名其他角色。该角色的回合结束后或死亡时，你收回该技能。",

                    "ms_zhujuan": "铸眷",
                    "ms_zhujuan_info": "锁定技，你使用的牌结算后：1.若此牌目标有你，你对一名其它角色无距离限制地使用此牌；2.若此牌不为手牌，你使用的下张牌无次数限制。",
                    "ms_zhujuan_nolimit": "铸眷（无限）",

                    "ms_chantong": "缠桐",
                    "ms_chantong_info": "当你造成伤害后，你可以重铸0至2张牌，然后弃置两张同花色牌（若有），再摸一张牌。",

                    "ms_duanyi": "断翼",
                    "ms_duanyi_info": "你可以将每个花色最后一张手牌当任意基本牌使用。<br>你每以此法使用一种牌名后，令一名角色获得强制发动，只有前半句，并且'任意基本牌'为此牌名的断翼，直到其下个回合结束。",
                    "ms_duanyi_debuff": "断翼",

                    "zengdao": "赠刀",
                    "zengdao_info": "出牌阶段开始时，你令所有角色依次使用牌堆中一张武器牌。然后本回合限一次，你可以将一张锦囊牌当【借刀杀人】使用。",
                    "zengdao_jiedao": "赠刀",
                    "zengdao_jiedao_info": "本回合限一次，你可以将一张锦囊牌当【借刀杀人】使用。",

                    // 百味
                    "ms_baiwei": "百味",
                    "ms_baiwei_info": "锁定技，你的回合内：①一名角色失去装备牌后，你对其造成1点伤害，然后其摸两张牌；②一名角色受到1点伤害后，你摸一张牌。",

                    // 剑舞
                    "ms_jianwu": "剑舞",
                    "ms_jianwu_info": "限定技，出牌阶段，你可以令所有角色依次选择一项：①其视为使用一张【借刀杀人】；②交给你一个有牌区域（手牌区、装备区或判定区）的所有牌。",

                    "zhujuan": "铸眷",
                    "zhujuan_info": "锁定技，你的回合内，任意角色使用的基本牌或普通锦囊牌结算后，若此牌目标有你，你摸一张牌并将一张牌当作此牌（即前面触发此技能的牌）使用，且伤害+1。",
                    "zhujuan_damage": "铸眷",
                    "zhujuan_silence_watcher": "铸眷",


                    "ms_polong": "破笼",
                    "ms_polong_info": "你使用的锦囊牌结算后，你可以令一名角色与此牌拼点，未赢的角色选择一项：<br>1.将自己的拼点牌交给你，并视为对你使用一张【杀】；<br>2.将自己的拼点牌当【过河拆桥】对你使用。",
                    "ms_polong_force": "破笼",

                    "ms_duota": "堕塔",
                    "ms_duota_info": "出牌阶段，你可以弃置一名角色一张牌，然后按照此牌花色执行对应效果：方片：其摸一张牌；红桃：此技能本回合失效；梅花：其视为使用一张铁索连环；黑桃：其视为使用一张雷【杀】。",
                    "ms_duota_ban": "堕塔（失效）",
                    "ms_shizu": "失足",
                    "ms_shizu_info": "锁定技，每轮你首次进入濒死时回复一点体力；若此时是你的回合内，你改为回复至满体力。"

                }
            }
        },

        files: {
            character: [
                "ms_meiya",
                "ms_xue",
                "ms_nayuta",
                "ms_kanami",
                "ms_wuluze",
                "ms_akiyuki",
                "ms_orizuka",
                "ms_chigasaki",
                "ms_chitose",
                "ms_congyu",
                "ms_linlihua",
                "ms_nikaido",
            ],
            card: [],
            skill: []
        }
    };
});