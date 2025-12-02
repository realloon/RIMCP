## `get_def_details`

输入一个 defName (例如 Bullet_SniperRifle)，该工具能以结构化的形式返回这个 Def 的所有属性，包括它从父级 ParentName 继承来的属性。

当我看到一个 Def 时，我只能看到它文件中明确写出的几个字段。但我不知道它还继承了哪些默认值。get_def_details 可以给我一个完整的、合并后的“最终视图”，让我准确了解一个物品或一个抛射物的全部属性。

## `find_linked_defs`

输入一个 defName，找到所有在 XML 中引用了这个 defName 的其他 Def。

我找到了 Bullet_SniperRifle 的定义，但哪个武器在使用它呢？我必须反过来去搜索 Bullet_SniperRifle 这个字符串。如果有了 find_linked_defs，我就可以直接问：“哪个 ThingDef 的 projectile 指向了 Bullet_SniperRifle？”，它会直接告诉我答案是 Gun_SniperRifle。这能极大地加速我理解物品之间关联的速度。

```
<.*>YourTargetDefName</.*>
```
